import { createSelector } from 'reselect'

import {
  statusAndNameSortCallback,
  generateCompanySelectorObject,
  findAndHighlightFirstInactive,
} from '../../utils/partnerUtils'

export const selectLoader = state => state.app.loader
export const selectError = state => state.app.error
export const selectStatusOfDataIsLoaded = state => state.app.dataIsLoaded

export const selectData = state => state.app.data

export const selectBrand = state => state.app.data.brand
export const selectPartner = state => state.app.data.partner
export const selectSortedCompanies = (state) => {
  if (!state.app.data.partner) return []
  const companies = state.app.data.partner.companies
  return companies.sort(statusAndNameSortCallback(true))
}
export const selectSortedCompaniesOptions = createSelector(
  selectSortedCompanies,
  (items) => {
    if (items.length) findAndHighlightFirstInactive(items)
    return items.map(elem => ({ value: elem.id, label: elem.name }))
  }
)
export const selectCompanySelectorObject = (state) => {
  if (!state.app.data.partner) return {}
  const companyId = state.app.data.id
  const companies = state.app.data.partner.companies
  return generateCompanySelectorObject(companyId, companies)
}

export const selectUserId = state => state.app.data.userId

/**
 * selectSelf* selectors don't support MSP case
 * You have to use them only when you're interested
 * in only signed-in user's company data.
 * ATTENTION: in 99% of cases you have to use selectActual* selectors.
 */
export const selectSelfCompanyId = state => state.app.data.id
export const selectSelfCompanyName = state => state.app.data.name
export const selectSelfLicenses = state => state.app.data.licenses
export const selectSelfPermissions = state => state.app.data.permissions
export const selectSelfIntegrations = state => state.app.data.integrations
export const selectSelfFeatureFlags = state => state.app.data.ff
export const selectSelfOwnerStatus = state => state.app.data.owner

/**
 * selectActual* selectors support MSP case.
 * Returning data for MSP selected company.
 * For not MSP case returning self data.
 */
export const selectActualCompanyId = state => state.partnerOptions.selectedCompany?.value || state.app.data.id
const selectActual = (state, field) => {
  if (!state.app.data.partner) return state.app.data[field]
  else {
    const id = selectActualCompanyId(state)
    const relevantCompany = state.app.data.partner.companies.find(c => c.id === id)
    return relevantCompany[field]
  }
}
export const selectActualLicenses = state => selectActual(state, 'licenses')
export const selectActualPermissions = state => selectActual(state, 'permissions')
export const selectActualCompanyName = state => selectActual(state, 'name')
export const selectActualIntegrations = state => selectActual(state, 'integrations')
export const selectActualFeatureFlags = state => selectActual(state, 'ff')
export const selectActualOwnerStatus = state => selectActual(state, 'owner')
export const selectActualLanguages = state => selectActual(state, 'languages')
export const selectActualEnabledLanguages = createSelector(
  selectActualLanguages,
  items => items.filter(l => l.enabled)
)
export const selectActualEnabledLanguagesOptions = createSelector(
  selectActualEnabledLanguages,
  items => items.map(elem => ({ value: elem.id, label: elem.name }))
)
export const selectActualDefaultLanguage = createSelector(
  selectActualLanguages,
  items => items.find(l => l.default)
)
export const selectActualWorkdays = state => selectActual(state, 'workdays')
export const selectActualTimezone = state => selectActual(state, 'timezone')
export const selectActualChurnZeroKey = state => selectActual(state, 'churnZeroKey')
export const selectActualScanBackStatus = state => selectActual(state, 'scanBackStatus')
export const selectAllActualProperties = state => ({
  licenses: selectActualLicenses(state),
  permissions: selectActualPermissions(state),
  integrations: selectActualIntegrations(state),
  ff: selectActualFeatureFlags(state),
})

export const selectEnvironment = state => state.app.data.environment
export const selectIsOnPremise = state => state.app.data.environment === 'ONPREMISE'

export const selectIsMaster = state => state.app.data.master
export const selectIsAdmin = state => state.app.data.permissions.admin

export const selectStatusOfIrontrapsLicensesAndPerm = state => state.app.data.licenses.irontraps &&
  (state.app.data.permissions.irontraps_viewer ||
    state.app.data.permissions.manage_irontraps ||
    state.app.data.permissions.irontraps_action)

export const selectIsAPIGenerated = state => state.app.data.is_api_generated

export const selectLanguages = state => state.app.data.languages

export const selectLastProductRelease = state => state.app.data.last_product_release
export const selectLastSeenProductRelease = state => state.app.data.product_release_last_seen_date
export const selectUserEmail = state => state.app.data.email
export const selectShowSupportButton = state => state.app.data.show_support_button
