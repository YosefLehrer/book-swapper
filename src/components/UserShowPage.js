import React from 'react'
import { View, Text, AsyncStorage, Button, FlatList, StyleSheet, ActionSheetIOS, Platform } from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'


import Book from './Book'

class UserShowPage extends React.Component {
   state = {
       nothing: null,
       userLibrary: [],
       tradeOffers: [],
       needFetch: false,
   }
   componentDidMount(){
       this.getUserLibrary()
   }

   getUserLibrary = () => {
    _retrieveData = async () => {
        try {
        const token = await AsyncStorage.getItem('token');
            if (token !== null) {
            fetch(`https://book-swapper-backend.herokuapp.com/user_library`, {
                headers: {
                    'accept': 'application/json', 
                        Authorization: token
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    console.log("user show page fetch for library and trades",data)
                    this.setState({userLibrary: data.books, tradeOffers: data.trades})
                })
            } else {
                   // this.props.navigation.navigate('Login', {autoLogin: this.autoLogin})
               }
           } catch (error) {
               alert("user not found")
           }
       }
       _retrieveData()
   }
   handleLogout = () => {
       if(Platform.OS === "ios"){
           ActionSheetIOS.showActionSheetWithOptions(
               {
                   options: ['Cancel', 'Logout'],
                   destructiveButtonIndex: 1,
                   cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        removeToken = async () => {
                            await AsyncStorage.removeItem('token')
                        }
                        removeToken()
                    this.setState({nothing: null})
                    this.props.navigation.navigate('Login', {autoLogin: this.props.navigation.state.params.autoLogin})
                    }
                },
        )
       } else {
        removeToken = async () => {
            await AsyncStorage.removeItem('token')
        }
        removeToken()
    this.setState({nothing: null})
    this.props.navigation.navigate('Login', {autoLogin: this.props.navigation.state.params.autoLogin})
       }
}

    handleAcceptingTrade = (tradeObject) => {
        fetch(`https://book-swapper-backend.herokuapp.com/accept_trade`, {
            method: 'POST',
            headers: {
                'accept': 'application/json', 
                'content-type': 'application/json',
            },
            body: JSON.stringify(tradeObject)
        })
        .then(resp => resp.json())
        .then(data => this.getUserLibrary())
    }

   render(){
       const user = this.props.navigation.state.params.User.user_name
       const mappedUserLibrary = this.state.userLibrary.map(book => {
           return <Book key={book.id} book={book} handleAddingToLibrary={this.handleAddingToLibrary} />
       })
           return (
               <View style={styles.container}>
                   <Text>Hi {user}</Text>
                   <Text>Your Library:</Text>
                   <View style={styles.bookshelf}>
                    {this.state.userLibrary.length < 1 ? <Text style={styles.emptyLibrary}>Your Library Is Empty</Text> : null}
                    <FlatList
                    horizontal={true}
                    data={mappedUserLibrary}
                    renderItem={({item}) => {
                    return <Book key={item.props.book.id} book={item.props.book}title={item.props.book.title}author={item.props.book.author}ISBN={item.props.ISBN}img={item.props.book.img}description={item.props.book.description}publisheddate={item.props.book.publishedDate}pagecount={item.props.book.pageCount}rating={item.props.book.rating}infolink={item.props.book.infoLink}googleid={item.props.book.googleid} navigation={this.props.navigation}/>
                    }}
                    />
                    </View>
                    <Text>Trade Offers:</Text>
                    <View style={styles.bookshelf}>
                    {this.state.tradeOffers.length < 1 ? <Text style={styles.emptyLibrary}>You Have No Pending Trades</Text> : null}
                    <FlatList
                    horizontal={true}
                    data={this.state.tradeOffers}
                    renderItem={({item}) => {
                    return <View style={styles.tradeOfferContainer}>
                            <Text>{item.owned_book.title}</Text>
                            <Text>For</Text>
                            <Text>{item.requestee.title}</Text>
                            <TouchableOpacity onPress={() => this.handleAcceptingTrade(item)}>
                                <Text>Accept this trade</Text>
                            </TouchableOpacity>
                            </View>
                    }}
                    />
                    </View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {User: user, getUserLibrary: this.getUserLibrary, autoLogin: this.props.autoLogin, getUserLibrary: this.getUserLibrary})} >
                       <Text style={{textAlign: 'center'}} >Search a Book</Text>
                   </TouchableOpacity>
                   <Button title="logout" onPress={this.handleLogout}/>
               </View>
           )
       }
 }
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#99b19c',
         textAlign: 'center',
     },
     bookshelf: {
         borderTopLeftRadius: 10,
         borderBottomLeftRadius: 10,
         marginLeft: 10,
         marginTop: 10,
         marginBottom: 10,
         paddingLeft: 10,
         maxHeight: 270,
         backgroundColor: '#A18276'
     },
     emptyLibrary: {
         padding: 20,
         fontSize: 20,
         textAlign: 'center'
     },
     tradeOfferContainer: {
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
     },
 })
const msp = (state) => {
    return {user: state.user}
}
export default connect(msp)(UserShowPage)