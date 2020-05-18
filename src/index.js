import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

// TODO:
// Setup the store
// + Check if the local storage has settings, if empty fill with default settings
// + Add logger settings

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
