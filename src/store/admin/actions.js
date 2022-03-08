// import store from '#store/index'
import { OPEN_ADMIN_DIALOG, CLOSE_ADMIN_DIALOG, UPDATE_SETTINGS } from './action-types'
// import { openSnackbar } from '../dialog/actions'
import { setSettings, getSettings } from '#config/settings'

/**
 * Update the settings
 *
 * @param {any} payload
 */
export function updateSettings (payload) {
  // Save to settings in storage
  setSettings({ ...payload })

  // Update the state
  return {
    type: UPDATE_SETTINGS,
    payload
  }
}

/**
 * Open the admin dialog popup
 *
 * @returns {any} Redux action type
 */
export function openAdminDialog () {
  return { type: OPEN_ADMIN_DIALOG }
}

/**
 * Close the admin dialog popup
 *
 * @returns {any} Redux action type
 */
export function hideAdminDialog () {
  return { type: CLOSE_ADMIN_DIALOG }
}

/**
 * @param {number} ratio
 */
export function updateWinRatio (ratio) {
  const settings = getSettings({ check: true })
  const updatedSettings = {
    ...settings,
    winRatio: ratio
  }

  // Post to snackbar
  // store.dispatch(openSnackbar(`Win Ratio: ${ratio}`))

  return updateSettings(updatedSettings)
}
