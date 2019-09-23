import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import TopLevel from './TopLevel'
import UserShowPage from './components/UserShowPage'
import SearchPage from './components/SearchPage'


const AppNavigator = createStackNavigator({
    Home: {
        screen: TopLevel,
    },
    User: {
        screen: UserShowPage,
    },
    Search: {
        screen: SearchPage,
    }
  }, {
    initialRouteName: 'Home',
  });
  
  
  
  export default createAppContainer(AppNavigator)