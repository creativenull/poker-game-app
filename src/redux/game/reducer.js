import { UPDATE_GAME_STATE, INC_BET_CREDITS, RESET_CREDITS } from './action-types'
import { GameState } from '#app/constant-types'

const initState = {
  betCredits: 0,
  totalCredits: 100,
  unit: 5,
  gameState: GameState.INIT
}

// Change game states in sequence
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

function reducer (state = initState, action) {
  switch (action.type) {
    case INC_BET_CREDITS:
      return {
        ...state,
        betCredits: state.betCredits + state.unit,
        totalCredits: state.totalCredits - state.unit
      }

    case UPDATE_GAME_STATE:
      return {
        ...state,
        gameState: getNextGameState(state.gameState)
      }

    case RESET_CREDITS:
      return { ...initState }

    default:
      return state
  }
}

export default reducer
