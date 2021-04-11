import {
  READINESS_LICENSE_INFO_SET,
} from './constants'

const getLicenseInformation = () => ({ type: READINESS_LICENSE_INFO_SET.INITIATE })
export const getLicenseInformationSuccess = data => ({ type: READINESS_LICENSE_INFO_SET.SUCCESS, payload: { data } })
export const getLicenseInformationError = error => ({ type: READINESS_LICENSE_INFO_SET.ERROR, error })
const getLicenseInformationCancel = () => ({ type: READINESS_LICENSE_INFO_SET.CANCEL })

export default { // to props
  getLicenseInformation,
  getLicenseInformationCancel,
}
