import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux'

import Login from './components/Login';
import UserShowPage from './components/UserShowPage';

class TopLevel extends React.Component {

    componentDidMount(){
        // this.autoLogin()
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
                            this.props.saveUser
                            this.props.navigation.navigate('User')
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

export default connect(msp, mdp)(TopLevel);