import React, { Component } from 'react'
import { View, Text, TextInput, AsyncStorage, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Book from './Book'
class SearchPage extends Component {
    state = {
        searchTerm: "",
        books: []
    }

    handleSearch = () => {
        fetch(`http://localhost:3000/books/search/q=${this.state.searchTerm}`)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.setState({books: data})
        })
    }

    handleAddingToLibrary = (book) => {
        const isbn = book.volumeInfo.industryIdentifiers.find(identifier =>identifier.type === "ISBN_10").identifier
      _retrieveData = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
            if (token !== null) {
              console.log(book)
              fetch(`http://localhost:3000/owned_books`, {
                method: 'POST',
                headers: {
                    "accept": 'application/json',
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    user_token: token,
                    book: {
                        title: book.volumeInfo.title,
                        author: book.volumeInfo.authors[0],
                        ISBN: isbn,
                        img: book.volumeInfo.imageLinks.thumbnail,
                        description: book.volumeInfo.description,
                        publisheddate: book.volumeInfo.publishedDate,
                        pagecount: book.volumeInfo.pageCount,
                        rating: book.volumeInfo.averageRating,
                        infolink: book.volumeInfo.infoLink,
                        googleid: book.id
                    }
                })
              })
              .then(resp => resp.json())
              .then(data => console.log(data))
            }
        } catch (error) {
            alert("user not found")
        }
      }
      _retrieveData()
    }

    render(){
        const mappedBooksArray = this.state.books.map(book => {
            return <Book key={book.id} book={book} handleAddingToLibrary={this.handleAddingToLibrary} />
        })
        return (
            <View>
                <Text></Text>
                <TextInput 
                placeholder="Search"
                value={this.state.searchTerm}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({searchTerm: text})}
                style={{borderStartWidth: 1, borderColor: '#fff'}}
                />
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <TouchableOpacity onPress={this.handleSearch}>
                    <Text>Search</Text>
                </TouchableOpacity>
                <ScrollView>
                {mappedBooksArray}
                </ScrollView>
            </View>
        )
    }
}

export default SearchPage