import store from '#store'
import {
  updateDealerView,
  resetBetCredits,
  gameGetAllHandsAction,
  gameGetWinnerAction,
  gameResetPokerAction,
  gameUpdateTotalCredits
} from '#store/game/actions'
import { GameState } from '#app/constant-types'
import logger from '#config/logger'

export default function onUpdateDispatchGameChanges (gameState, hideDealer) {
  if (gameState === GameState.INIT) {
    store.dispatch(gameGetAllHandsAction())
  } else if (gameState === GameState.START) {
    store.dispatch(resetBetCredits())
    store.dispatch(updateDealerView())
    store.dispatch(gameResetPokerAction())
    store.dispatch(gameGetAllHandsAction())
  } else if (gameState === GameState.END) {
    store.dispatch(updateDealerView({ hidden: false }))
    store.dispatch(gameGetWinnerAction())
    store.dispatch(gameUpdateTotalCredits())

    // TODO:
    // Tracking game session
    logger.add()
  } else {
    if (!hideDealer) {
      store.dispatch(updateDealerView())
    }
  }
}
