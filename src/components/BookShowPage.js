import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, } from 'react-native';
import Book from './Book';
import { TouchableOpacity } from 'react-native-gesture-handler';

class BookShowPage extends React.Component {
  state = {
    ownersOfThisBookArray: [],
  }
  componentDidMount(){
    this.fetchBookData()
  }

  fetchBookData = () => {
    fetch(`http://localhost:3000/books/${this.props.navigation.state.params.book.googleid}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.users !== "No users own this book"){
        this.setState({ownersOfThisBookArray: data.users})
      }
    })
  }

  render(){
    const handleAddingToLibrary = this.props.navigation.state.params.handleAddingToLibrary
    let mappedOwnersOfThisBook
    if (this.state.ownersOfThisBookArray.length < 1) {
      mappedOwnersOfThisBook = <Text>No users own this book</Text>
    } else {
      mappedOwnersOfThisBook = this.state.ownersOfThisBookArray.map(owner => {
        if (owner !== this.props.navigation.state.params.User){
          return (<View key={owner} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text >{owner}</Text>
                    <TouchableOpacity onPress={alert}>
                      <Text style={{color: '#00b894'}}>Offer Trade</Text>
                    </TouchableOpacity>
                    {/* <Button onPress={alert} title="Offer Trade"/> */}
                  </View>)
        }
    })
    }
    const book = this.props.navigation.state.params.book
    return (
      <View style={styles.container}>
      <View style={styles.bookContainer}>

        <View style={styles.imageContainer}>
          <Image source={{uri: book.img}} style={{width: 200, height: 300}}/>
          {handleAddingToLibrary ? <Text>Users who own this book:</Text> : null}
          {handleAddingToLibrary ? mappedOwnersOfThisBook : null}
          {handleAddingToLibrary ? <Button onPress={() => handleAddingToLibrary(this.props)}
          title="Add this Book to your Library"/> : null}
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
  
