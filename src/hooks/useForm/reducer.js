import {
  UPDATE_BACKGROUND_IMG,
  UPDATE_WIN_RATIO,
  UPDATE_REPLACE_CARD_LIMIT,
  UPDATE_PRIZE,
  RESET_FORM
} from './action-types'
import { defaultSettings } from '#app/config/settings'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_BACKGROUND_IMG:
      return {
        ...state,
        backgroundImage: action.payload
      }

    case UPDATE_WIN_RATIO:
      return {
        ...state,
        winRatio: action.payload
      }

    case UPDATE_REPLACE_CARD_LIMIT:
      return {
        ...state,
        replaceCardLimit: action.payload
      }

    case UPDATE_PRIZE:
      return {
        ...state,
        prizes: {
          ...state.prizes,
          [action.payload.key]: action.payload.value
        }
      }

    case RESET_FORM:
      return {
        ...defaultSettings
      }
  }
}
