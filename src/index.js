// DirectiveX Parser

module.exports = function (babel) {
	let { types: t } = babel
	
	return {
		visitor: {
			JSXAttribute(path) {
				let JSXElm = path.findParent((path) => path.isJSXElement()).node
				
				console.log(JSXElm)
			}
		}
	}
}
