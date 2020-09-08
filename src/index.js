import { createElement as h } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import { isSettings, setSettings, defaultSettings } from '#config/settings'

document.addEventListener('DOMContentLoaded', () => {
  if (!isSettings()) {
    setSettings(defaultSettings)
  }

  ReactDOM.render(
    h(Provider, { store }, h(App)),
    document.getElementById('app')
  )
})
