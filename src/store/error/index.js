import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import initState from './state'
import reducer from './reducer'

const ErrorStore = createContext(initState)

ErrorStoreProvider.propTypes = {
  children: PropTypes.any
}

export function ErrorStoreProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <ErrorStore.Provider value={{ state, dispatch }}>{children}</ErrorStore.Provider>
  )
}

export default ErrorStore
