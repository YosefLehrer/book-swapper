import React from 'react';
import { Text, View, AsyncStorage, StyleSheet, Image } from 'react-native';
import {connect} from 'react-redux'

class SplashPage extends React.Component {
    
    componentDidMount(){
        this.autoLogin()
    }
    
    autoLogin = () => {
        _retrieveData = async () => {
            try {
          const value = await AsyncStorage.getItem('token');
             if (value !== null) {
               fetch(`http://localhost:3000/autologin`, {
                   headers: {
                        'accept': 'application/json', 
                            Authorization: value
                        }
                    })
                    .then(resp=>resp.json())
                    .then(data => {
                        if (data.error){
                            console.log("IN autoLogin FROM splashPage", data)
                            alert(data.error)
                            this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                        }else {
                            this.props.navigation.navigate('User', {User: data, autoLogin: this.autoLogin})
                            // this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                        }
                    }
                    )
                    .catch((error) => console.log("ERROR", error))
                } else {
                    this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                }
            } catch (error) {
                this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
            }
        }
        _retrieveData()
    }
    
    render(){
        return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={require('./images/booklogo.png')} style={styles.logo}/>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#55efc4"
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    }
})
const msp = (state) => {
    return {user: state.user}
}

const mdp = () => {
    return {saveUser: (data) => dispatch({type: "SAVEUSER", payload: data})}
}

export default connect(msp, mdp)(SplashPage)