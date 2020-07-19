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

export function updateDealerView ({ hidden }) {
  return {
    type: UPDATE_DEALER_VIEW,
    payload: (typeof hidden === 'boolean') ? hidden : true
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
