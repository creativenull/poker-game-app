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
import { isPlayerLikelyToWin } from './reducer-utils'
import { GameState } from '#app/constant-types'
import Poker from 'pokerjs'
import { getSettings } from '#config/settings'

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
 * @returns {number} Update the total credits
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
 * Compute new hands determined by the win ratio.
 *
 * Before we give both players the cards
 * we need to determine the win ratio.
 * + If the number is between 0 and winRatio
 *   + Then check if player has winning hand
 *   + If they DO NOT have a winning hand, make sure DEALER gets the losing hand
 *   + Else do nothing
 * + If the number is between winRatio and 1.0
 *   + Then check if player has winning hand
 *   + If they DO have a winning hand, make sure DEALER gets the better hand
 *   + Else do nothing
 *
 * Give me a new poker context as well, to keep the keys consistent with react
 *
 * @param {number} randRatio
 *
 * @returns {object}
 */
function getHandsByWinRatio (randRatio) {
  const { winRatio } = getSettings()
  let pokerContext = null

  if (isPlayerLikelyToWin(randRatio, winRatio)) {
    // Player wins automatically
    console.log('PLAYER should win by', winRatio * 100, '% chance')

    let winnerId = 'dealer'
    let player = { id: 'player', hand: [] }
    let dealer = { id: 'dealer', hand: [] }

    // Loop until
    do {
      pokerContext = new Poker()
      player = { id: 'player', hand: pokerContext.getPlayerHand() }
      dealer = { id: 'dealer', hand: pokerContext.getPlayerHand() }
      const winners = pokerContext.winner([player, dealer])
      winnerId = winners[0].id
    } while (winnerId === 'dealer')

    return { player, dealer, pokerContext }
  } else {
    // Dealer wins automatically
    console.log('DEALER should win by', (1 - winRatio) * 100, '% chance')

    let winnerId = 'player'
    let player = { id: 'player', hand: [] }
    let dealer = { id: 'dealer', hand: [] }

    // Loop until
    do {
      pokerContext = new Poker()
      player = { id: 'player', hand: pokerContext.getPlayerHand() }
      dealer = { id: 'dealer', hand: pokerContext.getPlayerHand() }
      const winners = pokerContext.winner([player, dealer])
      winnerId = winners[0].id
    } while (winnerId === 'player')

    return { player, dealer, pokerContext }
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
