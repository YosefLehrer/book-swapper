import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SplashPage from './SplashPage'
import UserShowPage from './components/UserShowPage'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import Signup from './components/Signup'


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
  }, {
    initialRouteName: 'Home',
  });
  
  
  
  export default createAppContainer(AppNavigator)