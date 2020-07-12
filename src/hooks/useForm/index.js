import { useReducer } from 'react'
import reducer from './reducer'

export { updateBackgroundImg, updateCardLimit, updatePrize, updateWinRatio, resetForm } from './actions'

export default function useForm (initialState) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, onChangeAction: dispatch }
}
