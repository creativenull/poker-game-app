/**
 * Return a valid payload value, if validator is true
 *
 * @param {any} payload
 * @param {Function} validator
 *
 * @returns {any}
 */
export function actionPayload (payload, validator = () => false) {
  if (payload && validator(payload)) {
    return payload
  } else {
    throw new Error('Store Action: Invalid payload')
  }
}
