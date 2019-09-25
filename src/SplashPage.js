import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
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
                            alert(date.error)
                            this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                        }else {
                            // AsyncStorage.setItem('user', data.user_name)
                            this.props.navigation.navigate('User', {User: data, autoLogin: this.autoLogin})
                            // this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                        }
                    }
                    )
                } else {
                    this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                }
            } catch (error) {
                alert("user not found")
            }
        }
        _retrieveData()
    }
    
    render(){
        return (
        <View >
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
            <Text>SPLASHPAGE</Text>
          {/* <Login navigation={this.props.navigation} autoLogin={this.autoLogin}/> */}
          {/* <UserShowPage /> */}
          {/* <SearchPage /> */}
        </View>
        );
    }
}
const msp = (state) => {
    return {user: state.user}
}

const mdp = () => {
    return {saveUser: (data) => dispatch({type: "SAVEUSER", payload: data})}
}

export default connect(msp, mdp)(SplashPage)