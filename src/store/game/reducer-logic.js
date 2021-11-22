import { GameState } from '#app/constant-types'
import { getSettings } from '#config/settings'
import Poker from '@creativenull/pokerjs'

/**
 * Iterate to the next game state
 *
 * @param {string} gameState The current game state of the session
 *
 * @returns {string} The next game state of the session
 */
export function getNextGameState (gameState) {
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
export function getNonNegativeBetCredits (totalCredits, betCredits, payload) {
  return totalCredits > 0 ? betCredits + payload : betCredits
}

/**
 * Get a non-negative number for total credits
 *
 * @param {number} totalCredits Total amount of the player
 * @param {number} payload Increment unti
 *
 * @returns {number} Update the total credits
 */
export function getNonNegativeTotalCredits (totalCredits, payload) {
  return totalCredits > 0 ? totalCredits - payload : totalCredits
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
export function getPrizeAmount (handRankKey, betCredits, totalCredits) {
  const { prizes } = getSettings()
  return prizes[handRankKey] * betCredits + totalCredits
}

/**
 * @param {number} randRatio
 * @param {number} winRatio
 *
 * @returns {boolean}
 */
export function isPlayerLikelyToWin (randRatio, winRatio) {
  return randRatio > 0 && randRatio <= winRatio
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
export function getHandsByWinRatio (randRatio) {
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
