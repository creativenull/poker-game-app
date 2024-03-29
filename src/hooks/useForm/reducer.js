import {
  UPDATE_BACKGROUND_IMG,
  UPDATE_WIN_RATIO,
  UPDATE_REPLACE_CARD_LIMIT,
  UPDATE_PRIZE,
  UPDATE_TIMEZONE,
  UPDATE_THEME_MODE,
  RESET_FORM,
  RELOAD_INITIAL_STATE
} from './action-types'
import { defaultSettings } from '#app/config/settings'

/**
 * Set win ratio
 *
 * @param {number} payload
 *
 * @returns {number}
 */
function validateWinRatio (payload) {
  if (payload > 1.0) {
    return 1.0
  } else if (payload < 0.0) {
    return 0.0
  }

  return payload
}

/**
 * @param {any} state
 * @param {{ type: string, payload?: any }} action
 *
 * @returns {any}
 */
function reducer (state, action) {
  switch (action.type) {
    case UPDATE_BACKGROUND_IMG:
      return {
        ...state,
        backgroundImage: action.payload
      }

    case UPDATE_WIN_RATIO:
      return {
        ...state,
        winRatio: validateWinRatio(action.payload)
      }
    case UPDATE_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload
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

    case UPDATE_TIMEZONE:
      return {
        ...state,
        timeZone: action.payload
      }

    case RESET_FORM:
      return {
        ...defaultSettings
      }

    case RELOAD_INITIAL_STATE:
      return {
        ...action.payload
      }
  }
}

export default reducer
