import { createStore, combineReducers } from 'redux'
import gameReducer from './game/reducer'
import toastReducer from './toast/reducer'

const reducers = combineReducers({
  game: gameReducer,
  toast: toastReducer
})

export default createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
