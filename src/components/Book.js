import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { connect } from 'react-redux'

const Book =(props) => {
  let authorList
  if (props.book.volumeInfo.authors) {
    authorList = props.book.volumeInfo.authors.map(author => `${author} `)
  }
  let imageLink
  if (props.book.volumeInfo.imageLinks){
    imageLink = props.book.volumeInfo.imageLinks.thumbnail
  }
        return (
          <View >
            <Text>Title: {props.book.volumeInfo.title}</Text>
            {/* <Text>{authorList > 1 ? "Authors: " : "Author: "}{authorList}</Text> */}
            {authorList ? <Text>{authorList.length > 1 ? "Authors: " : "Author: "}{authorList}</Text> : null}
            {imageLink ? <Image style={{width: 100, height: 100}} source={{uri: imageLink}}/> : null}
            <Button onPress={() => props.handleAddingToLibrary(props.book)}
                title="Add this Book to your Library"/>
          </View>
        );
      }
      {/* <Text>{props.counter}</Text>
          <Button onPress={props.increase} title="Increase"/>
          <Button onPress={props.decrease} title="Decrease"/> */}
// function msp(state){
//     return {counter: state.counter} 
// }

// function mdp(dispatch){
//     return {increase: () => dispatch({type: "INCREASE"}), decrease: () => dispatch({type: "DECREASE"})}
// }

// export default connect(msp, mdp)(Book)
export default Book
