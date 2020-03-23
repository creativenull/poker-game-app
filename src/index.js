import React from 'react'
import ReactDOM from 'react-dom'
import { ErrorStoreProvider } from '#store/error'
import { GameStoreProvider } from '#store/game'
import App from './App'

ReactDOM.render((
  <ErrorStoreProvider>
    <GameStoreProvider>
      <App />
    </GameStoreProvider>
  </ErrorStoreProvider>
), document.getElementById('app'))
