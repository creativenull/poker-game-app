import store from '#store'
import { openAdminDialog } from '#store/admin/actions'

/** @param {EventTarget} event */
export default function onUpdateRegisterKeyCombo (event) {
  if (event.shiftKey && event.keyCode === 90) {
    store.dispatch(openAdminDialog())
  }
}
