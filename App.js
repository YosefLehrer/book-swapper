import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import AppNavigator from './src/AppNavigator'
import rootReducer from './src/reducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {

  render(){
    return (
        <Provider store={store} >
          <AppNavigator />
        </Provider>
    );
  }
}

export default App