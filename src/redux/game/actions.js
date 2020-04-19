import { INC_BET_CREDITS, UPDATE_GAME_STATE, RESET_CREDITS } from './action-types'

export function incrementBetCredits () {
  return { type: INC_BET_CREDITS }
}

export function updateGameState () {
  return { type: UPDATE_GAME_STATE }
}

export function resetCredits () {
  return { type: RESET_CREDITS }
}
