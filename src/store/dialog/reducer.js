import React from 'react'
import { SHOW_DIALOG, WINNER_DIALOG, LOSER_DIALOG, HIDE_DIALOG, OPEN_SNACKBAR, CLOSE_SNACKBAR } from './action-types'

const initState = {
  open: false,
  title: '',
  message: <span />,
  type: 'error',
  snackbar: {
    text: 'Saved!',
    open: false
  }
}

/**
 * Return new redux state based on action
 *
 * @param {any} state Initial state
 * @param {{ type: string, payload: any }} action Redux action with type and payload
 *
 * @returns {any} New redux state
 */
export default function reducer (state = initState, action) {
  switch (action.type) {
    case WINNER_DIALOG:
      return {
        ...state,
        title: '🎉 Congratulations you won!',
        message: action.payload,
        open: true,
        type: 'success'
      }

    case LOSER_DIALOG:
      return {
        ...state,
        title: '😕 Sorry you lost!',
        message: action.payload,
        open: true,
        type: 'error'
      }

    case SHOW_DIALOG:
      return {
        ...state,
        ...action.payload,
        open: true
      }

    case HIDE_DIALOG:
      return {
        ...state,
        open: false
      }

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          text: action.payload ?? 'Saved!',
          open: true
        }
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false
        }
      }

    default:
      return state
  }
}
