import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                fetch("https://book-swapper-backend.herokuapp.com/users", {
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
                            }
                        }
                        _storeData()
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
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                style={styles.input}
                placeholder="username"
                value={this.state.username}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({username: text})}
                />
                <Text></Text>
                <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                />
                <Text></Text>
                <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="re-enter password"
                value={this.state.repassword}
                onChangeText={(text) => this.setState({repassword: text})}
                />
                <TouchableOpacity onPress={this.handleSignup} style={styles.loginButton}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <Text>Already have an account? </Text>
                <Button title="Login" onPress={() => this.props.navigation.navigate('Login', {autoLogin: this.props.navigation.state.params.autoLogin})}/>
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
      // height: 40,
      fontSize: 18,
      // borderRadius: 13,
      backgroundColor: 'rgba(85,239,196,0.8)',
      paddingVertical: 15,
      // paddingHorizontal: 100,
      width: 300,
    },
    loginButton: {
      backgroundColor: '#00b894',
      paddingVertical: 15,
      paddingHorizontal: 100,
      marginTop: 15,
      fontWeight: '700',
    }
  });

export default Signup