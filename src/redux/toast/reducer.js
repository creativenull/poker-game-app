import { SHOW_TOAST, HIDE_TOAST } from './action-types'

const initState = {
  open: false,
  message: ''
}

function reducer (state = initState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        ...action.payload
      }

    case HIDE_TOAST:
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}

export default reducer
