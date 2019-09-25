import React from 'react'
import {View, Text, AsyncStorage, Button } from 'react-native'
import {connect} from 'react-redux'
import BookContainer from '../Containers/BookShelf'
import { TouchableOpacity } from 'react-native-gesture-handler'

class UserShowPage extends React.Component {
    state = {
        nothing: null
    }
    componentDidMount(){
        this.getUserLibrary()
    }

    getUserLibrary = () => {
        _retrieveData = async () => {
            try {
            const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                fetch(`http://localhost:3000/user_library`, {
                    headers: {
                        'accept': 'application/json', 
                            Authorization: token
                        }
                    })
                    .then(resp => resp.json())
                    .then(console.log)
                } else {
                    // this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
                }
            } catch (error) {
                alert("user not found")
            }
        }
        _retrieveData()
    }

    handleLogout = () => {
        AsyncStorage.removeItem('token')
        .then(data => {
            console.log(data)
            console.log("PROPS IN THE USER SHOW", this.props.navigation.state)
            this.setState({nothing: null})
            this.props.navigation.navigate('Login')
        })
    }
    render(){
        const user = this.props.navigation.state.params.User.user_name
            return (
                <View>
                    <Text>Hi {user}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                        <Text>Search Page</Text>
                    </TouchableOpacity>
                    <Button title="logout" onPress={this.handleLogout}/>
                </View>
            )
        }
    }

const msp = (state) => {
    return {user: state.user}
}
export default connect(msp)(UserShowPage)