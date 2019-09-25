import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'


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
            
            <View style={styles.formContainer}>
              <TextInput 
              placeholder="username"
              value={this.state.username}
              autoCapitalize = 'none'
              onChangeText={(text) => this.setState({username: text})}
              />
              <Text></Text>
              <TextInput 
              secureTextEntry={true}
              placeholder="password"
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
              />
              <Button title="Login" onPress={this.handleLogin}/>
              <Text>New User? </Text>
              <Button title="Sign Up" onPress={() => this.props.navigation.navigate('Signup', {autoLogin: this.props.autoLogin})}/>
            </View>
    );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center'
  }
});

function msp(state){
    return {} 
}

function mdp(dispatch){
    return {}
}

export default connect(msp, mdp)(Login)

