import store from '#store/index'
import { winnerDialog, loserDialog } from '#store/dialog/actions'
import logger from '#config/logger'

/** @param {any[]} winners */
export default function onUpdateDispatchWinnerDialogChanges (winners) {
  const {
    game: { player, dealer }
  } = store.getState()
  if (winners.length > 0) {
    // Log
    logger.add()

    // Post Winner
    console.table(winners)
    if (winners[0].id === player.id) {
      // PLAYER is winner
      const [winner, loser] = winners

      if (winner.handRank === loser.handRank) {
        // Won by tie breaker
        store.dispatch(winnerDialog({ playerHand: winner.name, dealerHand: loser.name, tie: true }))
      } else {
        // Won by higher hand
        store.dispatch(winnerDialog({ playerHand: winner.name, dealerHand: loser.name }))
      }
    } else if (winners[0].id === dealer.id) {
      // DEALER is winner
      const [winner, loser] = winners

      if (winner.handRank === loser.handRank) {
        // Lost by tie breaker
        store.dispatch(loserDialog({ playerHand: loser.name, dealerHand: winner.name, tie: true }))
      } else {
        // Lost by lower hand
        store.dispatch(loserDialog({ playerHand: loser.name, dealerHand: winner.name }))
      }
    }
  }
}
