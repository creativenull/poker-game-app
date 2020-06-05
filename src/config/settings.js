import { defaultPrizes } from './prizes'

const key = 'SETTINGS'

export const defaultSettings = {
  backgroundImage: 'https://images.wallpapersden.com/image/download/small-memory_58461_3840x2160.jpg',
  winRatio: 0.3,
  replaceCardLimit: 5,
  prizes: defaultPrizes
}

/**
 * Returns the data from settings in storage, with an initial
 * check flag we can check on refresh and get the latest settings
 *
 * @returns {object}
 */
export function getSettings (opts = { check: false }) {
  if (opts.check) {
    if (!isSettings()) {
      return { ...defaultSettings }
    }
  }

  return JSON.parse(localStorage.getItem(key))
}

/**
 * Sets the settings data to the storage
 *
 * @param {object} data
 *
 * @returns {void}
 */
export function setSettings (data) {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Returns if the settings exists on the storage
 *
 * @returns {boolean}
 */
export function isSettings () {
  return localStorage.getItem(key) !== null
}
