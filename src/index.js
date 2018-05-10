// DirectiveX Parser

module.exports = function (babel) {
	const { types: t } = babel
	
	return {
		inherits: require('babel-plugin-syntax-jsx'),
		visitor: {
			JSXElement(path) {
				var attrs = path.node.openingElement.attributes.map(
					attr => attr.name.name
				)
				
				if (!attrs.length)
					return

				if (attrs.includes('xGet'))
					path.replaceWith(
						require('./xGet')(t, path, attrs)
					)
				else if (attrs.includes('xBind'))
					path.replaceWith(
						require('./xBind')(t, path, attrs)
					)
				else if (attrs.includes('xRepeat'))
					path.replaceWith(
						require('./xRepeat')(t, path, attrs)
					)
				else if (attrs.includes('xIf'))
					path.replaceWith(
						require('./xIf')(t, path, attrs)
					)
			}
		}
	}
}
