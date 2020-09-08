import store from '#store'
import { getSettings } from '#config/settings'

const defaultLog = [
  [
    'Bet Amount',
    'Cards Replaced',
    'Win',
    'Chance of winning',
    'Win Ratio',
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
    betAmount,
    replacedCards,
    likelyToWin,
    isWinner,
    winRatio,
    replaceCardLimit
  } = params

  return [
    betAmount,
    replacedCards,
    isWinner ? 'Yes' : 'No',
    likelyToWin ? 'Yes' : 'No',
    winRatio,
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
    betAmount: game.betCredits,
    replacedCards: game.clickOnceList.length,
    likelyToWin: false,
    isWinner: game.winners[0].id === 'player',
    winRatio: settings.winRatio,
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
