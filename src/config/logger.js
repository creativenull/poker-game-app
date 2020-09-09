import store from '#store'
import { getSettings } from '#config/settings'
import { isPlayerLikelyToWin } from '#store/game/reducer-utils'

const defaultLog = [
  [
    'Total Credits',
    'Bet Amount',
    'Cards Replaced',
    'Chance of winning',
    'Winner?',
    'Current Round Win Ratio',
    'Set Win Ratio',
    'Replace Cards Limit'
  ]
]

/**
 * Logger key
 */
const _key = 'LOGS'

/**
 * Log builder to generate a CSV file from a JSON object
 *
 * @param {Object} params
 *
 * @returns {Object}
 */
function logBuilder (params) {
  const {
    totalCredits,
    betAmount,
    replacedCards,
    likelyToWin,
    isWinner,
    currentRoundWinRatio,
    playerWinRatio,
    replaceCardLimit
  } = params

  return [
    totalCredits,
    betAmount,
    replacedCards,
    likelyToWin ? 'Yes' : 'No',
    isWinner ? 'Yes' : 'No',
    currentRoundWinRatio.toPrecision(3),
    playerWinRatio,
    replaceCardLimit
  ]
}

/**
 * Add logs to the storage
 *
 * @param {Object} winner The winner
 *
 * @returns {void}
 */
function logAdd () {
  const logs = JSON.parse(localStorage.getItem(_key))
  const { game } = store.getState()
  const settings = getSettings()

  const log = logBuilder({
    totalCredits: game.totalCredits,
    betAmount: game.betCredits,
    replacedCards: game.clickOnceList.length,
    likelyToWin: isPlayerLikelyToWin(game.currentRoundWinRatio, settings.winRatio),
    isWinner: game.winners[0].id === 'player',
    currentRoundWinRatio: game.currentRoundWinRatio,
    playerWinRatio: settings.winRatio,
    replaceCardLimit: settings.replaceCardLimit
  })

  logs.push(log)
  localStorage.setItem(_key, JSON.stringify(logs))
}

/**
 * Export to a CSV file
 *
 * @returns {string}
 */
function logExport () {
  const logs = JSON.parse(localStorage.getItem(_key))

  let csvContent = 'data:text/csv;charset=utf-8,'

  for (const log of logs) {
    const row = log.join(',')
    csvContent += row + '\r\n'
  }

  return csvContent
}

/**
 * Check if the log file exists
 *
 * @returns {boolean}
 */
function logExists () {
  return localStorage.getItem(_key) !== null
}

/**
 * Set the file to have a default header row
 *
 * @returns {void}
 */
function logDefault () {
  localStorage.setItem(_key, JSON.stringify(defaultLog))
}

export default {
  add: logAdd,
  getCsvContent: logExport,
  exists: logExists,
  setDefault: logDefault
}
