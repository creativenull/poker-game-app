import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import { isSettings, setSettings, defaultSettings } from '#config/settings'

document.addEventListener('DOMContentLoaded', () => {
  if (!isSettings()) {
    // Check is settings exists, and add default if it does not
    setSettings(defaultSettings)
  }

  ReactDOM.render(
    React.createElement(Provider, { store }, React.createElement(App)),
    document.getElementById('app')
  )
})
