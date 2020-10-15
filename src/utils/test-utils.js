import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '#store'

function render (
  ui,
  {
    initialState,
    initialStore = store,
    ...renderOptions
  } = {}
) {
  function Wrapper (props) {
    return <Provider store={initialStore}>{props.children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }
