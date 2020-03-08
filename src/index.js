import React from 'react'
import ReactDOM from 'react-dom'
import { ErrorStoreProvider } from 'Store/error'
import { GameStoreProvider } from 'Store/game'
import App from './App'

ReactDOM.render((
  <ErrorStoreProvider>
    <GameStoreProvider>
      <App />
    </GameStoreProvider>
  </ErrorStoreProvider>
), document.getElementById('app'))
