// DirectiveX Parser

module.exports = function (babel) {
	const { types: t } = babel
	
	return {
		inherits: require('babel-plugin-syntax-jsx'),
		visitor: {
			JSXElement(path) {
				var attrs = path.node.openingElement.attributes.map(
						attr => attr.name.name
					),
					replacement
				
				if (!attrs.length)
					return

				if (attrs.includes('xRepeat'))
					path.replaceWith(
						require('./xRepeat')(t, path, attrs)
					)
			}
		}
	}
}
