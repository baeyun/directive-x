<h1 align="center">Directive-X</h1>

Directive-X is a JSX extension that simplifies coding in JSX. It uses Babel to transpile its '*xProps*' (that manipulate JSX element structures).

<h2 align="center">Getting Started</h2>

### Installation

Install package via `npm`:

```
npm install directive-x --save-dev
```
Since Directive-X is a Babel plugin, you'll need to include it in your `.babelrc` file:

```javascript
{
  "plugins": ["es2015", "react-preset", "directive-x"]
}
```

You may also include it in your `package.json` file if you prefer that way.

<h2 align="center">Usage</h2>

Directive-X allows you to write better JSX by allowing you to avoid common curfews that beginners find to be annoying about JSX. Check this:

### xRepeat

The `xRepeat` directive/prop allows you to iterate arrays the same way `ng-repeat` does. However, after it is transpiled, it achieves this through a declarative method by making use of `Array.map()` function. Check the following example:

```javascript
const ContactList = user => { 
  return (
    <View xRepeat={contact in user.contacts}>
      <Image source={contact.avatarThumbSrc} style={styles.avatar} />
      <Link to={`/chat/${contact.id}`}>{contact.username}</Link>
    </View>
  )
}
```

The above code get's transpiled to:

```javascript
const ContactList = user => {
  return user.contacts.map((contact, i) => {
    return <View style={styles.contact}>
      <Avatar source={contact.avatarThumbSrc} style={styles.avatar} />
      <Link to={`/chat/${contact.id}`}>{contact.username}</Link>
    </View>;
  });
};
```

### xIf

The `xIf` directive displays the element it belongs to if the given condition is `true`. This allows for quick control logic. Eg:

```javascript
<Text xIf={loggedIn}>{username}</Text>
```

The above code would be transpiled to:

```javascript
loggedIn ? <Text>{username}</Text> : null;
```

### xBind

The `xBind` directive handles the binding of `this` to all events on the element that it is given. eg:

```javascript
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

```

The above script will be transpiled to the following:

```javascript
class Button extends Component {
  xBindEvenHandlers() {
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(SomeComp);
  }

  constructor() {
    this.xBindEvenHandlers();
  }

  handleClick(e) {/*...*/}

  handleHover(e) {/*...*/}

  render() {
    return <View xBind onClick={e => this.handleClick(e)}>
        <Text xBind={SomeComp} onHover={this.handleHover} children="Click me" />
      </View>;
  }
}
```

Notice that the `xBind` directive accepts one arg that defaults to `this`, it then binds that arg to all the events of the element it belongs to. If no `constructor` method exists in the class, the `xBind` directive creates one. Without **Directive-X**'s `xBind` prop, the above code would've seem more tedious.

### xGet

The purpose of the `xGet` directive is to require data/objects from external files and import them in an encapsulated scope to be used by the component it belongs to. Eg:

```javascript
<Text
  xGet={ {red, dark, yellow} in './theme/colors' }
  style={{
    backgroundColor: red,
    color: dark,
    boxShadow: `1px 2px 2px ${yellow}`,
    padding: '7px 12px'
  }}
  children="Hello, World"
/>
```

<h2 align="center">Contributing</h2>

**Directive-X** is an open source library, and I'd appreciate any help you're willing to give - be it fixing bugs, improving documentation, or suggesting new features or enhancements.

<h2 align="center"><a href="https://github.com/bukharim96/ress/blob/master/LICENSE">License</a></h2>

**Directive-X** is licensed under the **MIT License** which makes it great for both personal and commercial use.

<p align="center"><strong>Enjoy</i> ;)</strong></p>