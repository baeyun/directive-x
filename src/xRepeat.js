// xRepeat Parser

module.exports = function (t, path, attrs) {
  var openingEl = path.node.openingElement,
    compIdentifier = t.JSXIdentifier(openingEl.name.name),
    props = openingEl.attributes.filter(
      prop => prop.name.name !== 'xRepeat'
    ),
    children = path.node.children,
    directive = openingEl.attributes[attrs.findIndex(
      attr => attr === 'xRepeat')
    ],
    {
      value: {
        expression: {
          left: { name: toRepAsIdentifier },
          right: toRepIdentifier
        }
      }
    } = directive,
    toRepIdentifierComputed = t.isStringLiteral(
      toRepIdentifier.property
    ),
    toRepIdentifier = toRepIdentifier.name
            ? t.identifier(toRepIdentifier.name)
            : t.memberExpression(
              toRepIdentifier.object,
              toRepIdentifier.property,
              toRepIdentifierComputed
            ),
    returnStatement = t.JSXElement(
      t.JSXOpeningElement(
        compIdentifier,
        props
      ),
      t.JSXClosingElement(compIdentifier),
      children,
      false
    )
  
  return t.callExpression(
    t.memberExpression(toRepIdentifier, t.identifier('map')), [
    t.arrowFunctionExpression(
      [
        t.identifier(toRepAsIdentifier),
        t.identifier('i')
      ],
      t.blockStatement([
        t.returnStatement(returnStatement)
      ])
    )
  ])
}
