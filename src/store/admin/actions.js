import { OPEN_ADMIN_DIALOG, CLOSE_ADMIN_DIALOG, UPDATE_SETTINGS } from './action-types'
import { setSettings } from '#config/settings'

export function updateSettings (payload) {
  // Save to settings in storage
  setSettings({ ...payload })
  console.log('Saved Settings!')

  // Update the state
  return {
    type: UPDATE_SETTINGS,
    payload
  }
}

/**
 * Open the admin dialog popup
 *
 * @returns Redux action type
 */
export function openAdminDialog () {
  console.log('Open Settings Dialog')
  return { type: OPEN_ADMIN_DIALOG }
}

/**
 * Close the admin dialog popup
 *
 * @returns Redux action type
 */
export function hideAdminDialog () {
  console.log('Close Settings Dialog')
  return { type: CLOSE_ADMIN_DIALOG }
}
