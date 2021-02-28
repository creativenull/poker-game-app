import store from '#store/index'
import { openAdminDialog } from '#store/admin/actions'

/** @param {KeyboardEvent} event */
export default function onUpdateRegisterKeyCombo (event) {
  if (event.shiftKey && event.key === 'd') {
    store.dispatch(openAdminDialog())
  }
}
