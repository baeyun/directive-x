class Button extends Component {
  handleClick(e) {/*...*/}

  handleHover(e) {/*...*/}
  
  render() {
    return(
      <View xBind onClick={(e) => this.handleClick(e)}>
        <Text xBind={SomeComp} onHover={this.handleHover} children="Click me" />
      </View>
    )
  }
}
