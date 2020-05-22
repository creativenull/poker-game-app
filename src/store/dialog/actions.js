import React from 'react'
import Typography from '@material-ui/core/Typography'
import { SHOW_DIALOG, HIDE_DIALOG, WINNER_DIALOG, LOSER_DIALOG } from './action-types'
import { bu } from './action-utils'

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
// export function winnerDialog (message) {
//   return {
//     type: WINNER_DIALOG,
//     payload: message
//   }
// }

export function winnerDialog (playerHandName, dealerHandName, isTie = false) {
  const tieWinnerMessage = <Typography variant="body1">
    You Won with the {bu(playerHandName)} higher ranked hand, dealer also had {bu(dealerHandName)} but
    lower ranked
  </Typography>
  const winnerMessage = <Typography variant="body1">
    You Won with the {bu(playerHandName)} hand! Dealer had a {bu(dealerHandName)} hand
  </Typography>

  if (isTie) {
    return {
      type: WINNER_DIALOG,
      payload: tieWinnerMessage
    }
  } else {
    return {
      type: WINNER_DIALOG,
      payload: winnerMessage
    }
  }
}

/**
 * Display dialog with reason of lose
 *
 * @param {string} message The primary message of the dialog
 *
 * @returns Redux action type
 */
// export function loserDialog (message) {
//   return {
//     type: LOSER_DIALOG,
//     payload: message
//   }
// }

export function loserDialog (playerHandName, dealerHandName, isTie = false) {
  const tieLoserMessage = <Typography variant="body1">
    You Lost with the {bu(playerHandName)} lower ranked hand, dealer also had {bu(dealerHandName)} but
    higher ranked
  </Typography>
  const loserMessage = <Typography variant="body1">
    You Lost with the {bu(playerHandName)} hand! Dealer had a {bu(dealerHandName)} hand
  </Typography>

  if (isTie) {
    return {
      type: LOSER_DIALOG,
      payload: tieLoserMessage
    }
  } else {
    return {
      type: LOSER_DIALOG,
      payload: loserMessage
    }
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
