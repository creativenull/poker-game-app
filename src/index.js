import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import { isSettings, setSettings, defaultSettings } from '#config/settings'

// TODO:
// Setup the store
// + Check if the local storage has settings, if empty fill with default settings
// + Add logger settings
document.addEventListener('DOMContentLoaded', () => {
  // Check is settings exists, and add default if it does not
  if (!isSettings()) {
    setSettings(defaultSettings)
  }

  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'))
})
