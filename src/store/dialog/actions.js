import { SHOW_DIALOG, HIDE_DIALOG, WINNER_DIALOG, LOSER_DIALOG } from './action-types'

/**
 * Display dialog
 *
 * @param {string} title The title of the dialog
 * @param {string} message The primary message of the dialog
 * @param {string} type The background color of the dialog
 *
 * @returns Redux action type
 */
export function showDialog (title, message, type = 'info') {
  return {
    type: SHOW_DIALOG,
    payload: {
      title,
      message,
      type
    }
  }
}

/**
 * Display dialog with reason of win
 *
 * @param {string} message The primary message of the dialog
 *
 * @returns Redux action type
 */
export function winnerDialog (message) {
  return {
    type: WINNER_DIALOG,
    payload: message
  }
}

/**
 * Display dialog with reason of lose
 *
 * @param {string} message The primary message of the dialog
 *
 * @returns Redux action type
 */
export function loserDialog (message) {
  return {
    type: LOSER_DIALOG,
    payload: message
  }
}

/**
 * Hide dialog
 *
 * @returns Redux action type
 */
export function hideDialog () {
  return { type: HIDE_DIALOG }
}
