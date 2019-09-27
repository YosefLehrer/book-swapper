import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { connect } from 'react-redux'
import { prototype } from 'uuid-js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Book =(props) => {
  console.log("props IN book", props)
  return (
    <View style={styles.bookContainer}>
      <Text>Title: {props.title}</Text>
      <Text>Author: {props.author}</Text>
      {props.img ? <Image style={{width: 100, height: 100}} source={{uri: props.img}}/> : null}
      <TouchableOpacity onPress={() => props.navigation.navigate('BookShowPage', {book: props.book})}>
        <Text>Details</Text>
      </TouchableOpacity>
      {props.handleAddingToLibrary ? <Button onPress={() => props.handleAddingToLibrary(props)}
          title="Add this Book to your Library"/> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    maxWidth: 130,
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
  

