import React from 'react'
import { View, Text, AsyncStorage, Button, FlatList, StyleSheet, ActionSheetIOS } from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { createAppContainer } from 'react-navigation';


import BookContainer from '../Containers/BookShelf'
import Book from './Book'

class UserShowPage extends React.Component {
    // static navigationOptions = {
    //     title: `Hi there ${this.props.navigation.state.params.User.user_name}`,
    //     }
   state = {
       nothing: null,
       userLibrary: []
   }
   componentDidMount(){
       this.getUserLibrary()
   }
   getUserLibrary = () => {
       _retrieveData = async () => {
           try {
           const token = await AsyncStorage.getItem('token');
               if (token !== null) {
               fetch(`http://localhost:3000/user_library`, {
                   headers: {
                       'accept': 'application/json', 
                           Authorization: token
                       }
                   })
                   .then(resp => resp.json())
                   .then(data => {
                       this.setState({userLibrary: data})
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
       
       ActionSheetIOS.showActionSheetWithOptions(
           {
               options: ['Cancel', 'Logout'],
               destructiveButtonIndex: 1,
               cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                AsyncStorage.removeItem('token')
            .then(data => {
                this.setState({nothing: null})
                this.props.navigation.navigate('Login', {autoLogin: this.props.navigation.state.params.autoLogin})
            })
                }
            },
    );
}
   render(){
       const user = this.props.navigation.state.params.User.user_name
       const mappedUserLibrary = this.state.userLibrary.map(book => {
           return <Book key={book.id} book={book} handleAddingToLibrary={this.handleAddingToLibrary} />
       })
           return (
               <View style={styles.container}>
                   <Text>Hi {user}</Text>
                   <Text>Your Library</Text>
                   <FlatList
                   style={styles.bookshelf}
                   horizontal={true}
                   data={mappedUserLibrary}
                   renderItem={({item}) => {
                   return <Book key={item.props.book.id} book={item.props.book}title={item.props.book.title}author={item.props.book.author}ISBN={item.props.ISBN}img={item.props.book.img}description={item.props.book.description}publisheddate={item.props.book.publishedDate}pagecount={item.props.book.pageCount}rating={item.props.book.rating}infolink={item.props.book.infoLink}googleid={item.props.book.googleid} navigation={this.props.navigation}/>
                   }}
                   />
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {User: user})} >
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
         margin: 10,
         borderTopLeftRadius: 10,
         borderBottomLeftRadius: 10,
         marginLeft: 10,
         paddingLeft: 10,
         maxHeight: 250,
         backgroundColor: '#A18276'
     }
 })
const msp = (state) => {
    return {user: state.user}
}
export default connect(msp)(UserShowPage)