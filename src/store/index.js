import { createStore, combineReducers } from 'redux'
import gameReducer from './game/reducer'
import dialogReducer from './dialog/reducer'

const reducers = combineReducers({
  game: gameReducer,
  dialog: dialogReducer
})

export default createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
