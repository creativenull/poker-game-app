import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import store from '#store/index'

/**
 * @param {any} ui
 * @param {object} props
 */
function render (ui, { initialState, initialStore = store, ...renderOptions } = {}) {
  /** @param {any} props */
  function Wrapper (props) {
    return <Provider store={initialStore}>{props.children}</Provider>
  }

  Wrapper.propTypes = {
    children: PropTypes.any
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }
