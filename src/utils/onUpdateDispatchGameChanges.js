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

export default function onUpdateDispatchGameChanges (gameState, hideDealer) {
  if (gameState === GameState.INIT) {
    store.dispatch(gameGetAllHandsAction())
    // TODO:
    // Start tracking the game session here
  } else if (gameState === GameState.START) {
    store.dispatch(resetBetCredits())
    store.dispatch(updateDealerView())
    store.dispatch(gameResetPokerAction())
    store.dispatch(gameGetAllHandsAction())
    // TODO:
    // Tracking game session
  } else if (gameState === GameState.CONTINUE) {
    // TODO:
    // Tracking game session
  } else if (gameState === GameState.END) {
    store.dispatch(updateDealerView({ hidden: false }))
    store.dispatch(gameGetWinnerAction())
    store.dispatch(gameUpdateTotalCredits())
    // TODO:
    // Tracking game session
  } else {
    if (!hideDealer) {
      store.dispatch(updateDealerView())
    }
  }
}
