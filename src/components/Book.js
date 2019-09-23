import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { connect } from 'react-redux'

const Book =(props) => {
    
    console.log("book", props.book.volumeInfo.title)
        return (
          <View >
            <Text>{props.book.volumeInfo.title}</Text>
            <Button onPress={() => props.handleAddingToLibrary(props.book)}
                title="Add this Book to your Library"/>
            {/* <Text>{props.counter}</Text>
                <Button onPress={props.increase} title="Increase"/>
                <Button onPress={props.decrease} title="Decrease"/> */}
          </View>
        );

}
// function msp(state){
//     return {counter: state.counter} 
// }

// function mdp(dispatch){
//     return {increase: () => dispatch({type: "INCREASE"}), decrease: () => dispatch({type: "DECREASE"})}
// }

// export default connect(msp, mdp)(Book)
export default Book
