import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import {View, Image} from 'react-native'

import SplashPage from './SplashPage'
import UserShowPage from './components/UserShowPage'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import Signup from './components/Signup'
import BookShowPage from './components/BookShowPage'


const AppNavigator = createStackNavigator({
    Home: {
        screen: SplashPage,
        navigationOptions: () => ({
          headerBackImage: <Image source={require('./images/baseline_exit_to_app_black_18dp.png')} />,
          headerBackTitle: null,
          headerLeft: <View>{null}</View>
        }),
    },
    User: {
        screen: UserShowPage,
        navigationOptions: () => ({
          headerBackImage: <Image source={require('./images/baseline_exit_to_app_black_18dp.png')} />,
          headerBackTitle: null,
          headerLeft: <View>{null}</View>
        }),
    },
    Search: {
        screen: SearchPage,
    },
    Login: {
        screen: Login,
        navigationOptions: () => ({
          headerBackImage: <Image source={require('./images/baseline_exit_to_app_black_18dp.png')} />,
          headerBackTitle: null,
          headerLeft: <View>{null}</View>
        }),
    },
    Signup: {
        screen: Signup
    },
    BookShowPage: {
      screen: BookShowPage
    }
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#00b894',
        },
        title: `Book Swapper`,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
  });
  
  
export default createAppContainer(AppNavigator)