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
import Poker from '#lib/Poker'
import { getSettings } from '#config/settings'

const initState = {
  betCredits: 0,
  totalCredits: 100,
  gameState: GameState.INIT,
  hideDealer: true,

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
 * Iterate to the next game state
 *
 * @param {string} gameState The current game state of the session
 *
 * @returns {string} The next game state of the session
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
 * Get a non-negative number for bet credits
 *
 * @param {number} totalCredits Total amount of the player
 * @param {number} betCredits Amount added for the current play
 * @param {number} payload Increment unti
 *
 * @returns {number} Update bet credits
 */
function getNonNegativeBetCredits (totalCredits, betCredits, payload) {
  return (totalCredits > 0) ? betCredits + payload : betCredits
}

/**
 * Get a non-negative number for total credits
 *
 * @param {number} totalCredits Total amount of the player
 * @param {number} payload Increment unti
 *
 * @returns {number} Update total credits
 */
function getNonNegativeTotalCredits (totalCredits, payload) {
  return (totalCredits > 0) ? totalCredits - payload : totalCredits
}

/**
 * Get the prize amount if the player won
 *
 * @param {string} handRankKey Hand rank value stated in prizes
 * @param {number} betCredits Amount the player made the bet
 * @param {number} totalCredits Total amount the player has
 *
 * @returns {number} Prize amount
 */
function getPrizeAmount (handRankKey, betCredits, totalCredits) {
  const { prizes } = getSettings()
  return (prizes[handRankKey] * betCredits) + totalCredits
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

    case GET_PLAYER_CARDS:
      return {
        ...state,
        winners: [],
        dealer: {
          ...state.dealer,
          hand: state.pokerContext.getPlayerHand()
        },
        player: {
          ...state.player,
          hand: state.pokerContext.getPlayerHand()
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
        ...state.player, hand
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

    case UPDATE_PLAYER_TOTAL_CREDITS:
      if (state.winners[0].id === state.player.id) {
        // Winner will get the prize return (prizeRatio x betCredits) + totalCredits
        return {
          ...state,
          totalCredits: getPrizeAmount(state.winners[0].handRankKey, state.betCredits, state.totalCredits)
        }
      } else {
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
