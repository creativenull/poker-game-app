import { OPEN_ADMIN_DIALOG, CLOSE_ADMIN_DIALOG } from './action-types'

/**
 * Open the admin dialog popup
 *
 * @returns Redux action type
 */
export function openAdminDialog () {
  return { type: OPEN_ADMIN_DIALOG }
}

/**
 * Close the admin dialog popup
 *
 * @returns Redux action type
 */
export function hideAdminDialog () {
  return { type: CLOSE_ADMIN_DIALOG }
}
