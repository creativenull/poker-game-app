import { SHOW_TOAST, HIDE_TOAST } from './action-types'

export function showToast (message) {
  return {
    type: SHOW_TOAST,
    payload: {
      message
    }
  }
}

export function hideToast () {
  return {
    type: HIDE_TOAST
  }
}
