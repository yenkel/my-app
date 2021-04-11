export const initialData = {
  global: {},
  dashboard: {
    accordionActiveItem: 0,
    dismissedSetups: {},
  },
}

function lsIsAvailable() {
  const test = 'IRONSCALES'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export default {
  isAvailable: lsIsAvailable(),

  /**
   * The function sets properties from initial if they are not already seated.
   * (any nesting)
   */
  init(initData = initialData) {
    if (this.isAvailable) {
      this._setInitialData(initData)
    }
  },

  getGlobalOptions() {
    return this._getValue('global')
  },

  setGlobalOptions(data) {
    return this._setValue('global', data)
  },

  getDashboardOptions() {
    return this._getValue('dashboard')
  },

  setDashboardOptions(data) {
    return this._setValue('dashboard', data)
  },

  _setInitialData(initData) {
    Object.keys(initData).map((key) => {
      const lsData = this._getValue(key)
      if (!this._setIfDoesntExist(key, lsData)) {
        this._checkStructForIdentical(key, lsData, initData[key])
        this._setValue(key, lsData)
      }
    })
  },

  _checkStructForIdentical(key, lsData, initData) {
    // eslint-disable-next-line
    if (this._isPlainObj(initData)) {
      Object.keys(initData).map((subKey) => {
        if (this._isPlainObj(initData[subKey])) {
          if (!this._isPlainObj(lsData[subKey])) {
            lsData[subKey] = {} // eslint-disable-line
          }
          this._checkStructForIdentical(subKey, lsData[subKey], initData[subKey])
        } else if (lsData[subKey] === undefined) {
          lsData[subKey] = initData[subKey] // eslint-disable-line
        }
      })
    } else {
      lsData[key] = initData[key] // eslint-disable-line
    }
  },

  _setIfDoesntExist(key, data) {
    if (!data) {
      this._setValue(key, initialData[key])
      return true
    }

    return false
  },

  _isPlainObj(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val) && val !== undefined
  },

  _setValue(key, data) {
    if (!this.isAvailable) return
    localStorage.setItem(key, JSON.stringify(data))
  },

  _delValue(key) {
    if (!this.isAvailable) return
    localStorage.removeItem(key)
  },

  _getValue(key) {
    if (!this.isAvailable) return null

    const val = localStorage.getItem(key)
    try {
      return JSON.parse(val)
    } catch (e) {
      return val // null if doesn`t exist
    }
  },
}
