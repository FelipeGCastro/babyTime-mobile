import React from 'react'
import CodePush from 'react-native-code-push'

import './config/ReactotronConfig'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Routes from './routes'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import {
  main
} from 'src/redux'

const store = createStore(combineReducers({
  main
}), applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App)
