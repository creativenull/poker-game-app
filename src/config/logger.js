const KEY = 'LOGS'

function logBuilder ({
  betAmount,
  replacedCards,
  likelyToWin,
  isWinner,
  winRatio,
  replaceCardLimit
}) {
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

function logAdd () {
  let currentLogs = JSON.parse(localStorage.getItem(KEY))
  currentLogs.push(data)

  localStorage.setItem(KEY, JSON.stringify(currentLogs))
}

function logExport () {
  return localStorage.getItem(KEY)
}

export default {
  add: logAdd,
  export: logExport
}
