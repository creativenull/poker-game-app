import { Actions } from './types'
import initState from './state'

function reducer (state, action) {
  switch (action.type) {
    case Actions.SHOW_ERROR:
      return {
        open: true,
        message: action.payload
      }

    case Actions.HIDE_ERROR:
      return initState

    default:
      return state
  }
}

export default reducer
