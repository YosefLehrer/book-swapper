import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, Modal, TouchableHighlight, FlatList, AsyncStorage } from 'react-native';
import Book from './Book';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

class BookShowPage extends React.Component {
  state = {
    displayedBook: "",
    ownersOfThisBookArray: [],
    showFullDescription: false,
    modalVisible: false,
    tradeOfferOwnerId: "",
    userLibrary: [],
    tradeOfferSelectedBook: null,
  }
  componentDidMount(){
    this.fetchBookData()
  }

  fetchBookData = () => {
    fetch(`http://localhost:3000/books/${this.props.navigation.state.params.book.googleid}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.users !== "No users own this book"){
        this.setState({ownersOfThisBookArray: data.users, displayedBook: data.book_id})
      }
    })
  }

  toggleFullDescription = () => {
    this.setState({showFullDescription: !this.state.showFullDescription})
  }

  toggleModal = (bookOwnerId) => {
    console.log(bookOwnerId)
    this._retrieveData()
    this.setState({modalVisible: true, tradeOfferOwnerId: bookOwnerId})
  }


  _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token ",token)
        if (token !== null) {
        fetch(`http://localhost:3000/user_library`, {
            headers: {
                'accept': 'application/json', 
                    Authorization: token
                }
            })
            .then(resp => resp.json())
            .then(data => {
              console.log("data with the user library from fetch: ", data)
              this.setState({userLibrary: data.books})
            })
        } else {
          alert("else from the fetch")
            }
        } catch (error) {
            alert("user not found")
        }
    }

    offerTrade = (item) => {
      _retrieveData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
            if (token !== null) {
              fetch(`http://localhost:3000/offer_trade`, {
                method: 'POST',
                headers: {
                  "content-type": 'application/json',
                  "accept": 'application/json'
                },
                body: JSON.stringify({
                  token: token,
                  requestee_id: this.state.tradeOfferOwnerId,
                  requester_book: item.id,
                  requestee_book: this.state.displayedBook
                })
              })
                .then(resp => resp.json())
                .then(data => alert(data.message))
            } else {
              alert("else from the fetch")
                }
            } catch (error) {
                alert("user not found")
            }
        }
        _retrieveData()
    }

  render(){
    const handleAddingToLibrary = this.props.navigation.state.params.handleAddingToLibrary
    let mappedOwnersOfThisBook
    if (this.state.ownersOfThisBookArray.length < 1) {
      mappedOwnersOfThisBook = <Text>No users own this book</Text>
    } else {
      mappedOwnersOfThisBook = this.state.ownersOfThisBookArray.map(owner => {
        if (owner !== this.props.navigation.state.params.User){
          return (<View key={owner.id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text >{owner.user_name}</Text>
                    <TouchableOpacity onPress={() => this.toggleModal(owner.user_id)}>
                      <Text style={{color: '#00b894'}}>Offer Trade</Text>
                    </TouchableOpacity>
                  </View>)
        }
    })
    }
    const book = this.props.navigation.state.params.book
    console.log("props in the book show page",this.props)
    console.log("state in the book show page",this.state)
    return (
      <View style={styles.container}>
         <View style={styles.titleContentContainer}>
          <Text style={{fontSize: 20,}}>{book.title}</Text>
          <Text><Text style={{fontWeight: 'bold'}} >By:</Text> {book.author}</Text>
        </View>
      <View style={styles.bookContainer}>

        <View style={styles.imageContainer}>
          <Image source={{uri: book.img}} style={{width: 160, height: 240}}/>
          {handleAddingToLibrary ? <Text>Users who own this book:</Text> : null}
          {handleAddingToLibrary ? mappedOwnersOfThisBook : null}
          {handleAddingToLibrary ? <Button onPress={() => handleAddingToLibrary(this.props)}
          title="Add this Book to your Library"/> : null}
        </View>

        <View style={styles.detailsContentContainer}>
          <Text style={{fontWeight: 'bold'}} >Description: </Text>
          {this.state.showFullDescription ? <View><ScrollView style={{maxHeight: 650}}><Text>{book.description}</Text><TouchableOpacity onPress={this.toggleFullDescription}><Text style={{color: 'rgb(0, 164, 219)'}}>Show less</Text></TouchableOpacity></ScrollView></View> : <View><Text>{`${book.description.slice(0, 300)}...`}</Text><TouchableOpacity onPress={this.toggleFullDescription}><Text style={{color: 'rgb(0, 164, 219)'}}>Show more</Text></TouchableOpacity></View>}
          {/* <Text>{book.description.length > 97 ?`${book.description.slice(0, 97)}...` : book.description}</Text> */}
          <Text><Text style={{fontWeight: 'bold'}}>Pages:</Text> {book.pagecount}</Text>
        </View>

      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        // onDismiss={() => }
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}>
        <View style={{marginTop: 60}}>
          <View>
            <Text>Which book would you like to offer?</Text>
          <FlatList
            style={styles.bookshelf}
            data={this.state.userLibrary}
            renderItem={({item}) => {
              console.log("in the flatlist", item)
              return <View key={item.id}>
                      <Text>{item.title}</Text>
                      <TouchableOpacity onPress={() => {
                        this.setState({modalVisible: false, tradeOfferSelectedBook: item})
                        this.offerTrade(item)
                        }}>
                        <Text>select</Text>
                      </TouchableOpacity>
                    </View>
            // <Book key={item.id} book={item}title={item.props.book.title}author={item.props.book.author}ISBN={item.props.ISBN}img={item.props.book.img}description={item.props.book.description}publisheddate={item.props.book.publishedDate}pagecount={item.props.book.pageCount}rating={item.props.book.rating}infolink={item.props.book.infoLink}googleid={item.props.book.googleid} navigation={this.props.navigation}/>
            }}
          />
            <TouchableHighlight
              onPress={() => {
                this.setState({modalVisible: false})
              }}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
  titleContentContainer: {
    fontSize: 150,
    padding: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    maxHeight: 200,
    flex: 1,
  },
  detailsContentContainer: {
    fontSize: 150,
    // alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    // marginTop: 40,
    // maxWidth: 300,
  }
})
export default BookShowPage
  
