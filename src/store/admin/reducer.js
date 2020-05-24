import { OPEN_ADMIN_DIALOG, CLOSE_ADMIN_DIALOG } from './action-types'

const initState = {
  dialog: {
    open: false
  }
}

export default function reducer (state = initState, action) {
  switch (action.type) {
    case OPEN_ADMIN_DIALOG:
      return {
        ...state,
        dialog: { open: true }
      }

    case CLOSE_ADMIN_DIALOG:
      return {
        ...state,
        dialog: { open: false }
      }

    default:
      return state
  }
}
