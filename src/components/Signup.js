import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'


class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        repassword: ""
    }

    handleSignup = () => {
      if(!this.state.username){
            alert('Username cannot be blank')
        } else if (!this.state.password) {
            alert('Password cannot be blank')
        } else if (!this.state.repassword) {
            alert('You must reenter your password')
        }else {
            if (this.state.password === this.state.repassword){
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            user_name: this.state.username,
                            password: this.state.password
                        }
                    })
                })
                .then(resp=>resp.json())
                .then(data=>{
                    if(data.error){
                        alert(data.error)
                    } else {
                        _storeData = async () => {
                            try {
                                await AsyncStorage.setItem('token', data.token);
                            } catch (error) {
                                console.log("Async setItem error")
                            }
                        }
                        _storeData()
                        console.log(this.props)
                        this.props.autoLogin()
                    }
                })
                .catch(() => alert('Sorry, something went wrong in the signup process'))
            } else {
                alert("Passwords must match")
                this.setState({password: "", repassword: ""})
            }
        }
    }
    
    render(){
        return (
            
            <View>
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
                <Text></Text>
                <TextInput 
                secureTextEntry={true}
                placeholder="re-enter password"
                value={this.state.repassword}
                onChangeText={(text) => this.setState({repassword: text})}
                />
                <Button title="Sign Up" onPress={this.handleSignup}/>
                <Text>Already have an account? </Text>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Login', {autoLogin: this.props.autoLogin})}/>
            </View>
    );

    }
}

export default Signup