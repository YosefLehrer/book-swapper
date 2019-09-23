import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import UserShowPage from './src/components/UserShowPage'
import AppNavigator from './src/AppNavigator'

import rootReducer from './src/reducer'
import TopLevel from './src/TopLevel';

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {

  render(){
    return (
        <Provider store={store} >
          < AppNavigator />
            {/* <TopLevel navigation={this.props.navigation}/> */}
        </Provider>
    );
  }
}

export default App


























// import React from 'react';
// import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import thunk from 'redux-thunk'

// import rootReducer from './src/reducer'
// import Login from './src/components/Login';
// import UserShowPage from './src/components/UserShowPage';
// import Book from './src/components/Book';

// const store = createStore(rootReducer, applyMiddleware(thunk))

// class App extends React.Component {

//   componentDidMount(){
//     this.autoLogin()
//   }

//   autoLogin = () => {
//     _retrieveData = async () => {
//       try {
//         const value = await AsyncStorage.getItem('token');
//         if (value !== null) {
//           fetch(`http://localhost:3000/autologin`, {
//             headers: {
//               'accept': 'application/json', 
//               Authorization: value
//             }
//           })
//           .then(resp=>resp.json())
//           .then(data => {
//             if (data.error){
//             }else {
//               this.props.navigation.navigate('User')
//             }

//           }
//             // set Redux state/store with current user here
//             )
//         }
//       } catch (error) {
//         alert("user not found")

//       }
//     };
//     _retrieveData()
//   }

//   render(){
//     return (
//       <Provider store={store} >
//         <View style={styles.container}>
//           <Login navigation={this.props.navigation} autoLogin={this.autoLogin}/>
//         </View>
//       </Provider>
//     );
    
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: App,
//   },
//   User: {
//     screen: UserShowPage,
//   },
// }, {
//     initialRouteName: 'Home',
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ddd',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// export default createAppContainer(AppNavigator);