import { SHOW_DIALOG, HIDE_DIALOG } from './action-types'

export function showDialog (title, message, type = 'error') {
  return {
    type: SHOW_DIALOG,
    payload: {
      title,
      message,
      type
    }
  }
}

export function hideDialog () {
  return {
    type: HIDE_DIALOG
  }
}
