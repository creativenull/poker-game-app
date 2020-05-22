import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import defaultPrizes from '#config/prizes'

// TODO:
// Setup the store
// + Check if the local storage has settings, if empty fill with default settings
// + Add logger settings
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('prizes') === null) {
    localStorage.setItem('prizes', JSON.stringify(defaultPrizes))
  }

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'))
})
