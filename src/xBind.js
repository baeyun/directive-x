// xBind Parser

module.exports = function (t, path, attrs) {
	var openingEl = path.node.openingElement,
		eventProps = openingEl.attributes.filter(
			prop => prop.name.name.slice(0, 2) === 'on'
		),
		directive = openingEl.attributes[
			attrs.findIndex(attr => attr === 'xBind')
		],
		bindTo = directive.value.expression.type !== 'ThisExpression'
			   ? t.identifier(directive.value.expression.name)
			   : t.thisExpression(),
		classDeclaration = path.find((path) => path.isClassDeclaration()),
		{
			node: {
				body: { body: classMethods }
			}
		} = classDeclaration,
		constructorMethodKey = classMethods.map(
			(cm, i) => cm.kind === 'constructor' && i
		).filter(i => i !== false)[0],
		oldConstructor = classDeclaration.node.body.body[constructorMethodKey],
		xBindsClassMethodKey = classMethods.map(
			(cm, i) => cm.key.name === 'xBinds' && i
		).filter(i => i !== false)[0],
		xBindsClassMethod = classDeclaration.node.body.body[xBindsClassMethodKey],
		xBindsExists = oldConstructor.body.body.map(
			v => v.expression.callee.property && v.expression.callee.property.name === 'xBinds'
		).filter(v => v)[0],
		bindToId = t.identifier('bindTo'),
		eventCallbackId = t.identifier('handleClick')
		
		if (!xBindsExists) {
			// construct new constructor
			var newConstructor = t.classMethod(
				'constructor',
				t.identifier('constructor'),
				oldConstructor.params,
				oldConstructor.body
			)
			
			// add xBinds call to constructor
			newConstructor.body.body[oldConstructor.body.body.length] = t.expressionStatement(t.callExpression(
				t.memberExpression(t.thisExpression(), t.identifier('xBinds')),
				[bindTo]
			))

			// Out with the old, in with the new
			delete classDeclaration.node.body.body[constructorMethodKey]
			classDeclaration.get('body').unshiftContainer('body', newConstructor)
		}
		
		// prepend 'xBinds' method in class if !exist
		if (!xBindsClassMethod) {
			var xBindsClassMethod = t.classMethod(
				'method',
				t.identifier('xBinds'),
				[bindToId],
				t.blockStatement([])
			)
			
			classDeclaration.get('body').unshiftContainer('body', xBindsClassMethod)
		}
		
		// safely extend xBinds method
		xBindsClassMethod.params = [bindToId]
		xBindsClassMethod.body.body[xBindsClassMethod.body.body.length] = t.expressionStatement(
			t.assignmentExpression(
				'=',
				t.memberExpression(t.thisExpression(), eventCallbackId),
				t.callExpression(
					t.memberExpression(
						t.memberExpression(t.thisExpression(), eventCallbackId),
						t.identifier('bind')
					),
					[bindToId]
				)
			)
		)
		
		// get rid of xBind prop &&/|| update events
}
