class Button extends Component {
    constructor(props, stuff) {
      super(props)
    }
  
  	handleClick(e, promptMsg='Hello, World!') {
      e.preventDefault()
      alert(promptMsg)
    }
  
	render() {
      let { props: {promptMsg, tooltipMsg} } = this
      
      return(
        <View xBind onSubmit={this.submit(blablabla)} onClick={(e) => this.handleClick(promptMsg)}>
            <Text xBind children="Click me" />
        </View>)
    }
}
