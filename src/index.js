import { createElement as h } from 'react'
import { render } from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import { isSettings, setSettings, defaultSettings } from '#config/settings'
import logger from '#config/logger'

document.addEventListener('DOMContentLoaded', () => {
  if (!isSettings()) {
    setSettings(defaultSettings)
  }

  if (!logger.exists()) {
    logger.setDefault()
  }

  render(
    h(Provider, { store }, h(App)),
    document.getElementById('app')
  )
})
