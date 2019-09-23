import React from 'react'
import {View, Text, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import BookContainer from '../Containers/BookShelf'
import { TouchableOpacity } from 'react-native-gesture-handler'

class UserShowPage extends React.Component {
    render(){
        const user = this.props.navigation.state.params.User.user_name
            return (
                <View>
                    <Text>Hi {user}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                        <Text>Search Page</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

const msp = (state) => {
    return {user: state.user}
}
export default connect(msp)(UserShowPage)