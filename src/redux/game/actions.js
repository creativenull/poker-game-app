import { INC_BET_CREDITS, UPDATE_GAME_STATE, RESET_CREDITS } from './action-types'

export function incrementBetCredits () {
  return {
    type: INC_BET_CREDITS
  }
}

export function updateGameState (gameState) {
  return {
    type: UPDATE_GAME_STATE,
    payload: gameState
  }
}

export function resetCredits () {
  return {
    type: RESET_CREDITS
  }
}
