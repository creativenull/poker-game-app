import {
  INC_BET_CREDITS,
  UPDATE_GAME_STATE,
  RESET_CREDITS,
  UPDATE_DEALER_VIEW,
  RESET_BET_CREDITS
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
