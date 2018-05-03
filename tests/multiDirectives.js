<Text
	xGet={ colors in './theme/colors' }
	xRepeat={ user in users }
	xIf={ !user.emailVerified }
	style={ [styles.notification, {color: colors.red}] }
	children={ `Warning! ${user.email} needs to be verified.` }
/>
