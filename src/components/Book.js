import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { connect } from 'react-redux'
import { prototype } from 'uuid-js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Book =(props) => {

  const findComponentOrigin = () => {
    props.handleAddingToLibrary ? props.handleAddingToLibrary : "nothing"
  }
  return (
    <View style={styles.bookContainer}>
      <Text>Title: {props.title}</Text>
      <Text>Author: {props.author}</Text>
      {props.img ? <Image style={{width: 100, height: 100}} source={{uri: props.img}}/> : null}
      <TouchableOpacity onPress={() => props.navigation.navigate('BookShowPage', {
        book: props.book,
        User: props.navigation.state.params.User,
        handleAddingToLibrary: props.handleAddingToLibrary ? props.handleAddingToLibrary : null
        })}>
        <Text>Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    maxWidth: 140,
    marginTop: 15,
    marginRight: 7.5,
    marginBottom: 15,
    marginLeft: 7.5,
    backgroundColor: '#F1D6B8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
})
export default Book
  

