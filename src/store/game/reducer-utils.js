export function isPlayerLikelyToWin (randRatio, winRatio) {
  return randRatio > 0 && randRatio <= winRatio
}
