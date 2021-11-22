import {
  INC_BET_CREDITS,
  UPDATE_GAME_STATE,
  RESET_CREDITS,
  UPDATE_DEALER_VIEW,
  RESET_BET_CREDITS,
  GET_PLAYER_CARDS,
  REPLACE_PLAYER_CARD,
  GET_POKER_WINNER,
  RESET_POKER,
  UPDATE_PLAYER_TOTAL_CREDITS
} from './action-types'

export function incrementBetCredits (incrementUnit = 5) {
  return {
    type: INC_BET_CREDITS,
    payload: incrementUnit
  }
}

export function updateGameState () {
  return { type: UPDATE_GAME_STATE }
}

/**
 * Update dealer view
 *
 * @param {{ hidden: boolean } | null} opts
 */
export function updateDealerView (opts = null) {
  return {
    type: UPDATE_DEALER_VIEW,
    payload: opts ? opts.hidden : true
  }
}

export function resetBetCredits () {
  return {
    type: RESET_BET_CREDITS
  }
}

export function resetCredits () {
  return { type: RESET_CREDITS }
}

export function gameGetAllHandsAction () {
  return { type: GET_PLAYER_CARDS }
}

/**
 * Replace a card
 *
 * @param {any} card
 */
export function gameReplaceCardAction (card) {
  return {
    type: REPLACE_PLAYER_CARD,
    payload: card
  }
}

export function gameGetWinnerAction () {
  return { type: GET_POKER_WINNER }
}

export function gameResetPokerAction () {
  return { type: RESET_POKER }
}

export function gameUpdateTotalCredits () {
  return { type: UPDATE_PLAYER_TOTAL_CREDITS }
}
