import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import initState from './state'
import reducer from './reducer'

const GameStore = createContext(initState)

GameStoreProvider.propTypes = {
  children: PropTypes.any
}

export function GameStoreProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <GameStore.Provider value={{ state, dispatch }}>{children}</GameStore.Provider>
  )
}

export default GameStore
