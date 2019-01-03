import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Image, StyleSheet, View } from 'react-native';

export default class ChatComponent extends React.Component {
  static navigationOptions = {
    title: 'Chat',
    headerStyle: { backgroundColor: 'rgba(66, 181, 73, 1.0)' }
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chat: this.props.navigation.getParam('chat', null),
      ideaId: this.props.navigation.getParam('ideaId', null),
    }

    this.state.chat.enterIdeaRoom(this.state.ideaId, (messages) => {
      const avatars = {
          'test':'https://ecs7.tokopedia.net/img/cache/150/career/team/2016/8/26/9_039d142c-0eb9-11e2-99c9-a9fbe3b59b20.jpg',
          'helmi':'https://ecs7.tokopedia.net/img/cache/150/career/team/2016/8/26/59_ea216e00-0ef2-11e2-89b2-da15e4b59b20.jpg',
          'umam': 'https://ecs7.tokopedia.net/img/cache/150/career/team/2016/8/26/48_344b9f80-0eb9-11e2-8ec5-a9fbe3b59b20.jpg'
      }
      const appendMessages = messages.map((message, index) => {
        return {
          _id: message.date,
          text: message.content,
          createdAt: new Date(message.date),
          user: {
            _id: message.sender,
            name: message.sender,
            avatar: avatars[message.sender]
          }
        };
      });
      const allMessages = [...this.state.messages, ...appendMessages];
      console.log('allMessages', allMessages)
      this.setState({
          messages: allMessages.sort((a,b) => b._id - a._id),
      })
  });
}

  onSend(messages = []) {
    messages.forEach(m => this.state.chat.sendMessage(m.text));
  }

  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgba(66, 181, 73, 1.0)'
          }
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.chat.user,
          }}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(227, 249, 227, 1.0)',
  },
  input: {
    height: 40,
  },
  button: {
    height: 150,
  },
  errMsg: {
  },
});
