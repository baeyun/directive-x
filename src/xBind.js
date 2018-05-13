// xBind Parser

module.exports = function (t, path, attrs) {
  let openingEl = path.node.openingElement
  
  if (!attrs.length || !attrs.includes('xBind'))
    return
  
  var classDeclaration = path.find((path) => path.isClassDeclaration())
  
  // bail if component not a class
  if (!classDeclaration)
    throw path.buildCodeFrameError(
      'xBind only works with Class based components'
    )
  
  var compIdentifier = t.JSXIdentifier(openingEl.name.name),
    eventProps = openingEl.attributes.filter(
      prop => prop.name.name.slice(0, 2) === 'on'
    ),
    directive = openingEl.attributes[
      attrs.findIndex(attr => attr === 'xBind')
    ],
    bindTo = directive.value && directive.value.expression.type !== 'ThisExpression'
      ? t.identifier(directive.value.expression.name)
      : t.thisExpression(),
    {
      node: {
        body: { body: classMethods }
      }
    } = classDeclaration,
    constructorMethodKey = classMethods.map((cm, i) => cm.kind === 'constructor' && i).filter(i => i !== false)[0],
    constructor = (constructorMethodKey >= 0)
      ? classDeclaration.node.body.body[constructorMethodKey]
      : t.classMethod(
          'constructor',
          t.identifier('constructor'),
          [],
          t.blockStatement([])
        ),
    xBindEvenHandlersClassMethodKey = classMethods.map((cm, i) => cm.key.name === 'xBindEvenHandlers' && i).filter(i => i !== false)[0],
    xBindEvenHandlersClassMethod = classDeclaration.node.body.body[xBindEvenHandlersClassMethodKey],
    xBindsCalledInConstructor = constructor.body.body.map(
      v => v.expression && v.expression.callee.property && v.expression.callee.property.name === 'xBindEvenHandlers'
    ).filter(v => v)[0],
    eventCallbackId = t.identifier('handleClick'),
    JSXOpeningElementSrc = path
      .getSource().split(/\>\n/)[0] // get opening JSX element
      .match(/(?:on\w+\s*\=\s*\{)*this\.(\w+)/gi),
    eventHandlerIDs = JSXOpeningElementSrc && JSXOpeningElementSrc.map(str => {
        return t.identifier(str.replace(/on\w+\s*\=\s*\{/, '').replace(/this\./, ''))
      })

  // get rid of xBind directive to prevent
  // further transpilation
  delete directive
  
  // Bail if there aren't any events in the first place
  if (!eventHandlerIDs)
    throw path.buildCodeFrameError( // @todo warn instead of error
    'Using xBind on event-less components is bad for performance'
  )
  
  if (!xBindsCalledInConstructor) {
    // add xBinds call to constructor
    constructor.body.body[constructor.body.body.length] = t.expressionStatement(
      t.callExpression(
        t.memberExpression(t.thisExpression(), t.identifier('xBindEvenHandlers')), []
      )
    )

    // Out with the old, in with the new
    delete classDeclaration.node.body.body[constructorMethodKey]
    classDeclaration.get('body').unshiftContainer('body', constructor)
  }
  
  // prepend 'xBindEvenHandlers' method in class if !exist
  if (!xBindEvenHandlersClassMethod) {
    var xBindEvenHandlersClassMethod = t.classMethod(
      'method',
      t.identifier('xBindEvenHandlers'),
      [],
      t.blockStatement([])
    )
    
    classDeclaration.get('body').unshiftContainer('body', xBindEvenHandlersClassMethod)
  }
  
  // safely extend xBindEvenHandlers class method
  for (let i = 0; i < eventHandlerIDs.length; i++) {
    xBindEvenHandlersClassMethod.body.body[xBindEvenHandlersClassMethod.body.body.length + i] = t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(t.thisExpression(), eventHandlerIDs[i]),
        t.callExpression(
          t.memberExpression(
            t.memberExpression(t.thisExpression(), eventHandlerIDs[i]),
            t.identifier('bind')
          ),
          [bindTo]
        )
      )
    )
  }

  return path
}
