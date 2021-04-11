import { get } from '../utils/rxfetch'

export default () => ({
  getLicenseInformation(companyId = '') {
    return get(`/members-api/companies/license?companyFilter=${companyId}`)
  },
})
