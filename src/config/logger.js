import store from '#store'
import { getSettings } from '#config/settings'

const KEY = 'LOGS'

/**
 * Log builder to generate a CSV file from a JSON object
 *
 * @param {Object} params
 *
 * @returns {Object}
 */
function logBuilder (params) {
  const {
    betAmount,
    replacedCards,
    likelyToWin,
    isWinner,
    winRatio,
    replaceCardLimit
  } = params

  return {
    betAmount: {
      name: 'Bet Amount',
      value: betAmount
    },
    replacedCards: {
      name: 'Cards replaced',
      value: replacedCards
    },
    likelyToWin: {
      name: 'Likely to Win',
      value: likelyToWin ? 'Yes' : 'No'
    },
    isWinner: {
      name: 'Winner?',
      value: isWinner ? 'Yes' : 'No'
    },
    winRatio: {
      name: 'Win Ratio',
      value: winRatio
    },
    replaceCardLimit: {
      name: 'Replace Card Limit',
      value: replaceCardLimit
    }
  }
}

/**
 * Add logs to the storage
 *
 * @param {Object} winner The winner
 *
 * @returns {void}
 */
function logAdd (winner) {
  const logs = JSON.parse(localStorage.getItem(KEY))
  const { game } = store.getState()
  const settings = getSettings()

  const log = logBuilder({
    betAmount: game.betCredits,
    replacedCards: game.clickOnceList.length,
    likelyToWin: false,
    isWinner: winner.id === 'player',
    winRatio: settings.winRatio,
    replaceCardLimit: settings.replaceCardLimit
  })

  logs.push(log)
  localStorage.setItem(KEY, logs)
}

/**
 * Export to a CSV file
 *
 * @returns {string}
 */
function logExport () {
  return localStorage.getItem(KEY)
}

export default {
  add: logAdd,
  export: logExport
}
