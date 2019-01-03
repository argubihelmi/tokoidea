import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import API from '../utils/api'

export default class AddProject extends React.Component {
  static navigationOptions = {
    title: 'Add idea',
    headerStyle: { backgroundColor: 'rgba(66, 181, 73, 1.0)' }
  };

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      image: 'https://picsum.photos/303',
      localization: 'en',
    }
  }

  handleAdd = () => {
    API.getInstance().addIdea(this.state)
      .then((response) => {
        if (response.ok) {
          Alert.alert(
            '',
            'Added new project',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert(
            '',
            `Error: ${JSON.stringify(response)}`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      });

    this.setState({
      title: null,
      description: null,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.itemName}>Title</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Name your idea"
          />
        </View>


        <View style={{ height: 360 }}>
          <Text style={styles.itemName}>Description</Text>
          <TextInput
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={20}
            style={[styles.input, { height: 300 }]}
            onChangeText={desc => this.setState({ description: desc })}
            value={this.state.description}
            placeholder="Tell something about your idea"
          />

        </View>

        <TouchableOpacity
          onPress={this.handleAdd}
          style={styles.button}
        >
          <Text style={{color: '#ffffff'}}>ADD IDEA</Text>
        </TouchableOpacity>
      </View>)
  }
}

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 0,
    left: 5,
    right: 5,
  },
  input: {
    padding: 12,
    marginTop: 10,
    width: '100%',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(66, 181, 73, 1.0)',
    backgroundColor: 'rgba(241, 241, 241, 1.0)', //'#f2f2f2',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.38)'
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(227, 249, 227, 1.0)',
    height: '100%',
    padding: 10
  },
  itemName: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
  button: {
    marginTop: 10,
    color: '#ffffff',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'rgba(66, 181, 73, 1.0)', //'#f8da87', //'#ff9f58',
  },
});
