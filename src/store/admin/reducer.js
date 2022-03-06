import { OPEN_ADMIN_DIALOG, CLOSE_ADMIN_DIALOG, UPDATE_SETTINGS } from './action-types'
import { getSettings } from '#config/settings'

const initState = {
  dialog: {
    open: false
  },
  settings: {
    ...getSettings({ check: true })
  }
}

/**
 * @param {any} state
 * @param {{ type: string, payload: any }} action
 *
 * @returns {any}
 */
export default function reducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...action.payload
        }
      }

    case OPEN_ADMIN_DIALOG:
      return {
        ...state,
        dialog: { open: true }
      }

    case CLOSE_ADMIN_DIALOG:
      return {
        ...state,
        dialog: { open: false }
      }

    default:
      return state
  }
}
