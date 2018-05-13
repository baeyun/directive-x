// xGet sample

(<Text
	xGet={ {red, dark, yellow} in './theme/colors' }
	style={{
		backgroundColor: red,
		color: dark,
		boxShadow: `1px 2px 2px ${yellow}`,
		padding: '7px 12px'
	}}
	children="Hello, World"
/>)

(<Text
	xGet={ colors in './theme/colors' }
	children="Warning..."
	style={{color: colors.red}}
/>)
