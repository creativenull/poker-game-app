import store from '#store/index'
import { openAdminDialog, updateWinRatio } from '#store/admin/actions'

/** @param {KeyboardEvent} event */
export default function onUpdateRegisterKeyCombo (event) {
  // Shift + D - Open admin dialog
  if (event.shiftKey && event.key === 'D') {
    store.dispatch(openAdminDialog())
  }

  // Alt + [0-9] - Adjust win ratio
  if (event.altKey && event.key.match(/[0-9]/) !== null) {
    const ratio = parseInt(event.key) / 10
    store.dispatch(updateWinRatio(ratio))
  }
}
