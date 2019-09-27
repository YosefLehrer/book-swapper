import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SplashPage from './SplashPage'
import UserShowPage from './components/UserShowPage'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import Signup from './components/Signup'
import BookShowPage from './components/BookShowPage'


const AppNavigator = createStackNavigator({
    Home: {
        screen: SplashPage,
    },
    User: {
        screen: UserShowPage,
    },
    Search: {
        screen: SearchPage,
    },
    Login: {
        screen: Login
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
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
  });
  
  
export default createAppContainer(AppNavigator)