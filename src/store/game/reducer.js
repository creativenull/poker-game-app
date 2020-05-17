import {
  UPDATE_GAME_STATE,
  INC_BET_CREDITS,
  RESET_CREDITS,
  UPDATE_DEALER_VIEW,
  RESET_BET_CREDITS
} from './action-types'
import { GameState } from '#app/constant-types'

const initState = {
  betCredits: 0,
  totalCredits: 100,
  unit: 5,
  gameState: GameState.INIT,
  hideDealer: true
}

/**
 * Iterate to the next game state
 *
 * @param {string} gameState The current game state of the session
 *
 * @returns The next game state of the session
 */
function getNextGameState (gameState) {
  if (gameState === GameState.INIT) {
    return GameState.CONTINUE
  } else if (gameState === GameState.START) {
    return GameState.CONTINUE
  } else if (gameState === GameState.CONTINUE) {
    return GameState.END
  } else if (gameState === GameState.END) {
    return GameState.START
  } else {
    return GameState.INIT
  }
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
    case INC_BET_CREDITS:
      return {
        ...state,
        betCredits: state.betCredits + state.unit,
        totalCredits: state.totalCredits - state.unit
      }

    case RESET_BET_CREDITS:
      return {
        ...state,
        betCredits: 0
      }

    case UPDATE_GAME_STATE:
      return {
        ...state,
        gameState: getNextGameState(state.gameState)
      }

    case UPDATE_DEALER_VIEW:
      return {
        ...state,
        hideDealer: typeof action.payload === 'boolean' ? action.payload : true
      }

    case RESET_CREDITS:
      return { ...initState }

    default:
      return state
  }
}
