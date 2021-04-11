import {
  COMPANY_FILTER_APPLY,
  COMPANY_FILTER_CHANGE,
} from './constants'

export const applyCompanyFilter = selectedCompany => ({ type: COMPANY_FILTER_APPLY, payload: { selectedCompany } })
export const companyFilterChange = selectedCompany => ({ type: COMPANY_FILTER_CHANGE, payload: { selectedCompany } })
