import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { connect } from 'react-redux'

const Book =(props) => {
        return (
          <View >
            <Text>Book Title</Text>
            <Button onPress={() => {

                    alert(`You are using ${Platform.OS}`);
                }}
                title="Press Me"/>
            <Text>{props.counter}</Text>
                <Button onPress={props.increase} title="Increase"/>
                <Button onPress={props.decrease} title="Decrease"/>
          </View>
        );

}
function msp(state){
    return {counter: state.counter} 
}

function mdp(dispatch){
    return {increase: () => dispatch({type: "INCREASE"}), decrease: () => dispatch({type: "DECREASE"})}
}

export default connect(msp, mdp)(Book)
