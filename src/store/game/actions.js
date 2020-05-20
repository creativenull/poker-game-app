import {
  INC_BET_CREDITS,
  UPDATE_GAME_STATE,
  RESET_CREDITS,
  UPDATE_DEALER_VIEW,
  RESET_BET_CREDITS,
  GET_PLAYER_CARDS,
  REPLACE_PLAYER_CARD,
  GET_POKER_WINNER,
  RESET_POKER
} from './action-types'

export function incrementBetCredits () {
  return { type: INC_BET_CREDITS }
}

export function updateGameState () {
  return { type: UPDATE_GAME_STATE }
}

export function updateDealerView (hide = true) {
  return {
    type: UPDATE_DEALER_VIEW,
    payload: hide
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
