class Button extends Component {
	constructor(props) {
		super(props)
	}
	
	handleClick(promptMsg='Hello, World!') {
		alert(promptMsg)
	}
	
	render() {
		let { props: {promptMsg, tooltipMsg} } = this
		
		return(
			<View
				xBind={lol} onClick={this.handleClick(promptMsg)}
				onHover={this.displayTooltip(tooltipMsg)}>
				<Text children="Click me" />
			</View>
		)
	}
}
