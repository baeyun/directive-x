// xShowIf Parser

module.exports = function (t, path, attrs) {
	var openingEl = path.node.openingElement,
		compIdentifier = t.JSXIdentifier(openingEl.name.name),
		props = openingEl.attributes.filter(
			prop => prop.name.name !== 'xShowIf'
		),
		children = path.node.children,
		directive = openingEl.attributes[attrs.findIndex(
			attr => attr === 'xShowIf')
		],
		{ value: { expression: condition } } = directive,
		alternate = t.nullLiteral(),
		consequent = t.JSXElement(
			t.JSXOpeningElement(
				compIdentifier,
				props
			),
			t.JSXClosingElement(compIdentifier),
			children,
			false
		)
	    
	return t.conditionalExpression(
		condition,
		consequent,
		alternate
	)
}