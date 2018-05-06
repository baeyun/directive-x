<Text
	xGet={
		{
			colors: red,
			layout: grid: {
				col
			},
			btn
		} in './theme'
	}
	xRepeat={ user in users }
	xIf={ !user.emailVerified }
	style={ [col.sm6, btn.warning, {color: red}] }
	children={ `Warning! ${user.email} needs to be verified.` }
/>
