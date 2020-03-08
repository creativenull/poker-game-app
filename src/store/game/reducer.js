import { actionPayload } from 'Store/utils'
import { Actions } from './types'

function reducer (state, action) {
  switch (action.type) {
    case Actions.INC_BET_CREDITS:
      return {
        ...state,
        betCredits: actionPayload(state.betCredits + state.unit, (pl) => typeof pl === 'number'),
        totalCredits: actionPayload(state.totalCredits - state.unit, (pl) => typeof pl === 'number')
      }

    case Actions.UPDATE_TOTAL_CREDITS:
      return {
        ...state,
        totalCredits: actionPayload(action.payload, (pl) => typeof pl === 'number')
      }

    case Actions.UPDATE_GAME_STATE:
      return {
        ...state,
        gameState: actionPayload(action.payload, (pl) => typeof pl === 'string')
      }

    case Actions.CLEAR_STATE:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default reducer
