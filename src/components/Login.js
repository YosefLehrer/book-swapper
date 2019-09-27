import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';


class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleLogin = () => {
      if(!this.state.username || !this.state.password){
       alert('Username and/or password cannot be blank')
        } else {
          fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
          .then(resp=>resp.json())
          .then(data=>{
            if(data.error){
              alert(data.error)
            } else {
              AsyncStorage.setItem('token', data.token)
              .then(resp => {
                console.log("IN THE LOGIN PROPS", resp, this.props.navigation)
                this.props.navigation.state.params.autoLogin()
              })
                  }
              })
          .catch(() => alert('Sorry, something went wrong in the login process'))
        }
    }
    
    render(){
        return (
            
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.formContainer}>
              <TextInput
              style={styles.input}
              placeholder="username"
              value={this.state.username}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCapitalize = 'none'
              autoCorrect={false}
              onChangeText={(text) => this.setState({username: text})}
              />
              <Text></Text>
              <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="password"
              value={this.state.password}
              returnKeyType="go"
              onSubmitEditing={this.handleLogin}
              ref={(input) => this.passwordInput = input}
              onChangeText={(text) => this.setState({password: text})}
              />
              <TouchableOpacity onPress={this.handleLogin} style={styles.loginButton}>
                <Text>Login</Text>
              </TouchableOpacity>
              <Button title="Sign Up" onPress={() => this.props.navigation.navigate('Signup', {autoLogin: this.props.autoLogin})}/>
              </View>
            </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // textAlign: 'center'
  },
  formContainer: {
    // textAlign: 'left',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55efc4'
  },
  input: {
    height: 40,
    // borderRadius: 13,
    backgroundColor: 'red',//'rgba(85,239,196,0.8)',
    paddingVertical: 15,
    paddingHorizontal: 100
  },
  loginButton: {
    backgroundColor: '#00b894',
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginTop: 15,
    fontWeight: '700',
  }
});

function msp(state){
    return {} 
}

function mdp(dispatch){
    return {}
}

export default connect(msp, mdp)(Login)

