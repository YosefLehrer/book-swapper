import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './components/Login';
import UserShowPage from './components/UserShowPage';
import SearchPage from './components/SearchPage'

class TopLevel extends React.Component {
    
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
                        }else {
                            AsyncStorage.setItem('user', data.user_name)
                            this.props.navigation.navigate('User', {User: data})
                        }
                    }
                    )
                }
            } catch (error) {
                alert("user not found")
            }
        };
        _retrieveData()
    }
    
    render(){
        return (
        <View >
          <Login navigation={this.props.navigation} autoLogin={this.autoLogin}/>
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

export default connect(msp, mdp)(TopLevel)