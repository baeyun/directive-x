// xGet Parser

module.exports = function (t, path, attrs) {
  var openingEl = path.node.openingElement,
    compIdentifier = t.JSXIdentifier(openingEl.name.name),
    props = openingEl.attributes.filter(
      prop => prop.name.name !== 'xGet'
    ),
    children = path.node.children,
    directive = openingEl.attributes[attrs.findIndex(
      attr => attr === 'xGet')
    ],
    {
      value: {
        expression: {
          left: varDeclaratorId,
          right: varDeclaratorInit
        }
      }
    } = directive,
    varDeclaratorId = t.isIdentifier(varDeclaratorId)
      ? varDeclaratorId
      : t.ObjectPattern(varDeclaratorId.properties),
    requireVarsExp = t.VariableDeclaration('var', [
      t.variableDeclarator(
        varDeclaratorId,
        t.callExpression(
          t.identifier('require'),
          [varDeclaratorInit]
        )
      )
    ]),
    JSXElement = t.JSXElement(
      t.JSXOpeningElement(
        compIdentifier,
        props
      ),
      t.JSXClosingElement(compIdentifier),
      children,
      false
    )

  return t.arrowFunctionExpression([],
    t.blockStatement([
      requireVarsExp,
      t.returnStatement(JSXElement)
    ])
  )
}
