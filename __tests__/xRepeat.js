// Sample stateless component that makes
// use of the xRepeat directive

const ContactList = user => { 
  return (
    <View xRepeat={contact in user.contacts} style={styles.contact}>
    	<Avatar source={contact.avatarThumbSrc} style={styles.avatar} />
        <Link to={`/chat/${contact.id}`}>{contact.username}</Link>
    </View>
  )
}
