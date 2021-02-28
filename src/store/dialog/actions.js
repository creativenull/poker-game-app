import React from 'react'
import Typography from '@material-ui/core/Typography'
import { SHOW_DIALOG, HIDE_DIALOG, WINNER_DIALOG, LOSER_DIALOG, OPEN_SNACKBAR, CLOSE_SNACKBAR } from './action-types'
import { bu } from './action-utils'

/**
 * Display dialog
 *
 * @param {object} props The title of the dialog
 *
 * @returns Redux action type
 */
export function showDialog ({ title, message, type = 'info' }) {
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
 * @param {object} props The primary message of the dialog
 *
 * @returns Redux action type
 */
export function winnerDialog ({ playerHand, dealerHand, tie = false }) {
  const tieWinnerMessage = <Typography variant="body1">
    You Won with the {bu(playerHand)} higher ranked hand, dealer also had {bu(dealerHand)} but
    lower ranked
  </Typography>
  const winnerMessage = <Typography variant="body1">
    You Won with the {bu(playerHand)} hand! Dealer had a {bu(dealerHand)} hand
  </Typography>

  if (tie) {
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
 * @param {object} props The primary message of the dialog
 *
 * @returns Redux action type
 */
export function loserDialog ({ playerHand, dealerHand, tie = false }) {
  const tieLoserMessage = <Typography variant="body1">
    You Lost with the {bu(playerHand)} lower ranked hand, dealer also had {bu(dealerHand)} but
    higher ranked
  </Typography>
  const loserMessage = <Typography variant="body1">
    You Lost with the {bu(playerHand)} hand! Dealer had a {bu(dealerHand)} hand
  </Typography>

  if (tie) {
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

export function openSnackbar () {
  return { type: OPEN_SNACKBAR }
}

export function closeSnackbar () {
  return { type: CLOSE_SNACKBAR }
}
