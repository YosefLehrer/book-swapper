import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'

class UserShowPage extends React.Component {
    render(){
        return (
            <View>
                <Text>Hi Userksajdf</Text>
            </View>
        )
    }
}
const msp = (state) => {
    return {user: state.user}
}
export default connect(msp, null)(UserShowPage)