import {
  UPDATE_GAME_STATE,
  INC_BET_CREDITS,
  RESET_CREDITS,
  UPDATE_DEALER_VIEW,
  RESET_BET_CREDITS,
  GET_PLAYER_CARDS,
  REPLACE_PLAYER_CARD,
  GET_POKER_WINNER,
  RESET_POKER,
  UPDATE_PLAYER_TOTAL_CREDITS
} from './action-types'
import { GameState } from '#app/constant-types'
import { getSettings } from '#config/settings'
import Poker from '@creativenull/pokerjs'
import {
  getHandsByWinRatio,
  getNextGameState,
  getNonNegativeBetCredits,
  getNonNegativeTotalCredits,
  getPrizeAmount
} from './reducer-logic'

const initState = {
  betCredits: 0,
  totalCredits: 100,
  gameState: GameState.INIT,
  hideDealer: true,
  currentRoundWinRatio: 0,

  pokerContext: new Poker(),
  winners: [],
  clickOnceList: [],
  player: {
    id: 'player',
    hand: []
  },
  dealer: {
    id: 'dealer',
    hand: []
  }
}

/**
 * Return new redux state based on action
 *
 * @param state Initial state
 * @param {{ type: string, payload: any }} action Redux action with type and payload
 *
 * @returns {object} New redux state
 */
export default function reducer (state = initState, action) {
  switch (action.type) {
    case INC_BET_CREDITS:
      return {
        ...state,
        betCredits: getNonNegativeBetCredits(state.totalCredits, state.betCredits, action.payload),
        totalCredits: getNonNegativeTotalCredits(state.totalCredits, action.payload)
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
        hideDealer: action.payload
      }

    case GET_PLAYER_CARDS: {
      // Perform a random number
      const randRatio = Math.random()
      const { player, dealer, pokerContext } = getHandsByWinRatio(randRatio)

      return {
        ...state,
        currentRoundWinRatio: randRatio,
        pokerContext,
        winners: [],
        dealer,
        player
      }
    }

    case REPLACE_PLAYER_CARD: {
      const card = action.payload
      const { replaceCardLimit } = getSettings()

      // Do nothing to the state
      if (state.clickOnceList.includes(card.id)) {
        return { ...state }
      }

      // Add a limit to how many cards can be replaced
      if (state.clickOnceList.length === replaceCardLimit) {
        return { ...state }
      }

      // Else we get a new hand set with the replaced card
      const [hand, newCard] = state.pokerContext.replace(card, state.player.hand)
      const newPlayer = {
        ...state.player,
        hand
      }
      const newClickOnceList = [...state.clickOnceList, newCard.id]

      return {
        ...state,
        player: newPlayer,
        clickOnceList: newClickOnceList
      }
    }

    case GET_POKER_WINNER:
      return {
        ...state,
        winners: state.pokerContext.winner([state.player, state.dealer])
      }

    case UPDATE_PLAYER_TOTAL_CREDITS: {
      if (state.winners[0].id === state.player.id) {
        // Winner will get the prize return (prizeRatio x betCredits) + totalCredits
        return {
          ...state,
          totalCredits: getPrizeAmount(state.winners[0].handRankKey, state.betCredits, state.totalCredits)
        }
      }

      return {
        ...state
      }
    }

    case RESET_POKER:
      return {
        ...state,
        clickOnceList: [],
        winners: [],
        pokerContext: new Poker(),
        currentRoundWinRatio: 0,
        player: {
          ...state.player,
          hand: []
        },
        dealer: {
          ...state.dealer,
          hand: []
        }
      }

    case RESET_CREDITS:
      return {
        ...state,
        betCredits: 0
      }

    default:
      return state
  }
}
