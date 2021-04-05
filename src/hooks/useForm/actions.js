import {
  RELOAD_INITIAL_STATE,
  RESET_FORM,
  UPDATE_BACKGROUND_IMG,
  UPDATE_PRIZE,
  UPDATE_REPLACE_CARD_LIMIT,
  UPDATE_TIMEZONE,
  UPDATE_WIN_RATIO
} from './action-types'

/** @param {React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>} event */
export function updateBackgroundImg (event) {
  return {
    type: UPDATE_BACKGROUND_IMG,
    payload: event.target.value
  }
}

/** @param {React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>} event */
export function updateWinRatio (event) {
  return {
    type: UPDATE_WIN_RATIO,
    payload: parseFloat(event.target.value)
  }
}

/** @param {React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>} event */
export function updateCardLimit (event) {
  return {
    type: UPDATE_REPLACE_CARD_LIMIT,
    payload: parseInt(event.target.value)
  }
}

/** @param {React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>} event */
export function updatePrize (event) {
  return {
    type: UPDATE_PRIZE,
    payload: {
      key: event.target.name,
      value: typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value
    }
  }
}

/** @param {React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>} event */
export function updateTimezone (event) {
  return {
    type: UPDATE_TIMEZONE,
    payload: event.target.value
  }
}

export function resetForm () {
  return { type: RESET_FORM }
}

/** @param {any} initialState */
export function reloadInitialState (initialState) {
  return {
    type: RELOAD_INITIAL_STATE,
    payload: { ...initialState }
  }
}
