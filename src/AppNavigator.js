import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator } from 'react-navigation'

import SplashPage from './SplashPage'
import UserShowPage from './components/UserShowPage'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import Signup from './components/Signup'
import BookShowPage from './components/BookShowPage'


const AppNavigator = createStackNavigator({
    User: {
        screen: UserShowPage
    },
    Search: {
        screen: SearchPage,
    },
    BookShowPage: {
      screen: BookShowPage
    }
  }, {
    initialRouteName: 'User',
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
const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup
  },
},
{
  initialRouteName: 'Login',
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
})
  
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: SplashPage,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
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
  }
))