/**
 * @param {number} randRatio
 * @param {number} winRatio
 *
 * @returns {boolean}
 */
export function isPlayerLikelyToWin (randRatio, winRatio) {
  return randRatio > 0 && randRatio <= winRatio
}
