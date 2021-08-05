import { useReducer } from 'react'
import reducer from './reducer'

export {
  updateBackgroundImg,
  updateCardLimit,
  updatePrize,
  updateWinRatio,
  updateTimezone,
  updateThemeMode,
  resetForm
} from './actions'

/**
 * @param {any} initialState
 */
export default function useForm (initialState) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, onChangeAction: dispatch }
}
