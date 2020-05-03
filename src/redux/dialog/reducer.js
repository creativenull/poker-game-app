import { SHOW_DIALOG, HIDE_DIALOG } from './action-types'

const initState = {
  open: false,
  title: '',
  message: '',
  type: 'error'
}

function reducer (state = initState, action) {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        ...action.payload,
        open: true
      }

    case HIDE_DIALOG:
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}

export default reducer
