import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, } from 'react-native';
import Book from './Book';
import { TouchableOpacity } from 'react-native-gesture-handler';

class BookShowPage extends React.Component {
  // console.log(props.navigation.state.params.book)
  // const book = props.navigation.state.params.book
  componentDidMount(){
    this.fetchBookData()
  }

  fetchBookData = () => {
    console.log(this.props.navigation.state.params.book.googleid)
    fetch(`http://localhost:3000/books/${this.props.navigation.state.params.book.googleid}`)
    .then(resp => resp.json())
    .then(console.log)
  }

  render(){
    const book = this.props.navigation.state.params.book
    return (
      <View style={styles.container}>
      <View style={styles.bookContainer}>

        <View style={styles.imageContainer}>
          <Image source={{uri: book.img}} style={{width: 200, height: 300}}/>
        </View>

        <View style={styles.textContentContainer}>
          <Text style={{fontSize: 20, textAlign: 'center',}}>{book.title}</Text>
          <Text>By: {book.author}</Text>
          <Text>{book.description.length > 97 ?`${book.description.slice(0, 97)}...` : book.description}</Text>
          <Text>Pages: {book.pagecount}</Text>
        </View>

      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginRight: 7.5,
    marginBottom: 15,
    marginLeft: 7.5,
    backgroundColor: '#F1D6B8',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    backgroundColor: 'blue',
    maxHeight: 200,
    flex: 2,
  },
  textContentContainer: {
    fontSize: 150,
    // alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    // marginTop: 40,
    maxWidth: 300,
  }
})
export default BookShowPage
  
