import React from 'react'
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Chat } from '../utils/chat'
import API from '../utils/api'

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: 'pass',
      errorMessage: '',
    }
  }

  handleSubmit = () => {
    API.createInstance(this.state.login, this.state.password)
      .login()
      .then(() => {
        const { navigate } = this.props.navigation;
        navigate('App');
      })
      .catch((error) => {
        this.handleWrongCredentials(error);
      });
  }

  handleWrongCredentials = (error) => {
    this.setState({
      errorMessage: error.message,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View> */}

        <Image style={styles.logo} source={require('../assets/images/Tokopedia_Mascot.png')} />
        <Image style={styles.logo2} source={require('../assets/images/Tokopedia_Logo-transparency.png')} />
        {/* </View> */}
        <View style={styles.itemContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            color='#ffffff'
            style={styles.input}
            onChangeText={text => this.setState({ login: text.toLowerCase() })}
            value={this.state.login}
            placeholder="login"
          />
          <TextInput
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholder="password"
          />

          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.button}>
              <Text style={{color: '#ffffff'}}>LOGIN</Text>
            </View>

          </TouchableOpacity>
        </View >
        {/* <Text style={styles.errMsg}>{this.state.errorMessage}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'rgba(227, 249, 227, 1.0)',
    height: '100%',
  },
  input: {
    padding: 12,
    marginTop: 10,
    width: 200,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(66, 181, 73, 1.0)',
    backgroundColor: 'rgba(241, 241, 241, 1.0)', //'#f2f2f2',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.38)'
  },
  label: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    color: '#ffffff',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: 200,
    backgroundColor: 'rgba(66, 181, 73, 1.0)', //'#f8da87', //'#ff9f58',
  },
  logo: {
    // flexGrow:1,
    marginTop: 50,
    height:'25%',
    width:'100%',
    // alignItems: 'center',
    // justifyContent:'center',
    // backgroundColor: 'yellow',
    resizeMode: 'contain',
  },
  logo2: {
    // flexGrow:1,
    // height:200,
    width:'100%',
    height:'40%',
    // marginVertical: -300,
    // marginHorizontal: 25,
    alignItems: 'center',
    justifyContent:'center',
    // backgroundColor: 'yellow',
    resizeMode: 'cover',
  },
  itemContainer: {
    marginTop: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // height: 400,
    flexGrow:2,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',

  },
  errMsg: {},
});
