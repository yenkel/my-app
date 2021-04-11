import { formatDateShort } from '../../../../utils/dateUtils'

const selectLoader = state => state.dashboard.home.licenses.loader
const selectError = state => state.dashboard.home.licenses.error
const selectExpiery = state => formatDateShort(state.dashboard.home.licenses.expiery)
const selectLicenseInfo = state => state.dashboard.home.licenses.license

export {
  selectLoader,
  selectError,
  selectExpiery,
  selectLicenseInfo,
}
