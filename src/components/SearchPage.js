import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
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
        _retrieveData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                    if (token !== null) {
                        fetch(`http://localhost:3000/owned_books`, {
                            method: 'POST',
                            headers: {
                                "accept": 'application/json',
                                "content-type": 'application/json'
                            },
                            body: JSON.stringify({
                                user_token: token,
                                book_id: book.id
                            })
                        })}
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
                {mappedBooksArray}
            </View>
        )
    }
}

export default SearchPage