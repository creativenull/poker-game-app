import React from 'react'
import { SHOW_DIALOG, WINNER_DIALOG, LOSER_DIALOG, HIDE_DIALOG } from './action-types'

const initState = {
  open: false,
  title: '',
  message: <span></span>,
  type: 'error'
}

/**
 * Return new redux state based on action
 *
 * @param state Initial state
 * @param action Redux action with type and payload
 *
 * @returns New redux state
 */
export default function reducer (state = initState, action) {
  switch (action.type) {
    case WINNER_DIALOG:
      return {
        title: '🎉 Congratulations you won!',
        message: action.payload,
        open: true,
        type: 'success'
      }

    case LOSER_DIALOG:
      return {
        title: '😕 Sorry you lost!',
        message: action.payload,
        open: true,
        type: 'error'
      }

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
