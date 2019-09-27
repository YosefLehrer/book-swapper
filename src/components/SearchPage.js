import React, { Component } from 'react'
import { View, Text, TextInput, AsyncStorage, ScrollView, FlatList } from 'react-native'
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
            this.setState({books: data})
            console.log("straight from fetch", data)
        })
    }

    handleAddingToLibrary = (book) => {
        console.log("Book in the adding fetch", book)
      _retrieveData = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
            if (token !== null) {
              fetch(`http://localhost:3000/owned_books`, {
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
              .then(data => console.log(data))
            }
        } catch (error) {
            alert("user not found")
        }
      }
      _retrieveData()
    }

    render(){
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
                <FlatList
                data={this.state.books}
                renderItem={({item}) => {
                return <Book key={item.googleid} book={item} handleAddingToLibrary={this.handleAddingToLibrary} 


                title={item.title}
                author={item.author}
                // ISBN={item.props.ISBN}
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
                {/* <ScrollView>
                {mappedBooksArray}
                </ScrollView> */}
            </View>
        )
    }
}

export default SearchPage