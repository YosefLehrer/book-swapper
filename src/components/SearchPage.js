import React, { Component } from 'react'
import { View, Text, TextInput, AsyncStorage, ScrollView, FlatList, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

import Book from './Book'
class SearchPage extends Component {
    state = {
        searchTerm: "",
        books: [],
        nothing: null
    }

    handleSearch = () => {
        fetch(`https://book-swapper-backend.herokuapp.com/books/search/q=${this.state.searchTerm}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({books: data, searchTerm: ""})
        })
        .catch(() => alert("Sorry, no books were found"))
    }

    handleAddingToLibrary = (paramsBook) => {
        const book = paramsBook.navigation.state.params.book
      _retrieveData = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
            if (token !== null) {
              fetch(`https://book-swapper-backend.herokuapp.com/owned_books`, {
                method: 'POST',
                headers: {
                    "accept": 'application/json',
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    user_token: token,
                    book: {
                        title: book.title,
                        author: book.author,
                        img: book.img,
                        description: book.description,
                        publisheddate: book.publisheddate,
                        pagecount: book.pagecount,
                        rating: book.rating,
                        infolink: book.infolink,
                        googleid: book.googleid,
                    }
                })
              })
              .then(resp => resp.json())
              .then(data => {
                  if (data.alreadyInLibrary){
                      Alert.alert("Whoops", data.alreadyInLibrary)
                  } else if (data.successfullyAddedToLibrary){
                      Alert.alert("Hooray", data.successfullyAddedToLibrary)
                  }
                  this.props.navigation.state.params.getUserLibrary()
                  this.props.navigation.navigate('User')
                })
            }
        } catch (error) {
            alert("user not found")
        }
      }
      _retrieveData()
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Icon name='search' style={styles.icon} size={40}/>
                    <TextInput 
                    placeholder={`Search`}
                    value={this.state.searchTerm}
                    returnKeyType='search'
                    autoCapitalize = 'none'
                    clearButtonMode='while-editing'
                    autoFocus={true}
                    autoCorrect={false}
                    onSubmitEditing={this.handleSearch}
                    onChangeText={(text) => this.setState({searchTerm: text})}
                    style={styles.input}
                    />
                </View>
                <FlatList
                data={this.state.books}
                renderItem={({item}) => {
                return <Book 
                    key={item.googleid} book={item} 
                    handleAddingToLibrary={this.handleAddingToLibrary} 
                    title={item.title}
                    author={item.author}
                    img={item.img}
                    description={item.description}
                    publisheddate={item.publishedDate}
                    pagecount={item.pageCount}
                    rating={item.rating}
                    infolink={item.infoLink}
                    googleid={item.googleid}
                    navigation={this.props.navigation}
                />}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99b19c',
        padding: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    icon: {
        marginTop: 100,
    },
    input: {
        borderStartWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingLeft: 14,
        height: 40,
        flexGrow: 1,
    }
})
export default SearchPage