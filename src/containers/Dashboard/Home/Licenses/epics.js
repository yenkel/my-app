import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { matchURL } from '../../../../utils/urls'
import { epicsErrorHandler } from '../../../../epics'

import {
  READINESS_LICENSE_INFO_SET,
} from './constants'
import { COMPANY_FILTER_CHANGE } from '../../../PartnerOptions/constants'

import {
  getLicenseInformationSuccess,
  getLicenseInformationError,
} from './actions'

const getLicenseInformationEpic = (action$, store, { api }) => action$
  .ofType(COMPANY_FILTER_CHANGE, READINESS_LICENSE_INFO_SET.INITIATE)
  .filter((action) => {
    if (action.type === COMPANY_FILTER_CHANGE) return matchURL('/dashboard')
    return true
  })
  .mergeMap(() => api.companies.getLicenseInformation(
    store.getState().partnerOptions.selectedCompany?.value
  )
    .map(response => getLicenseInformationSuccess(response))
    .catch(error => Observable.of(epicsErrorHandler(getLicenseInformationError, error)))
    .takeUntil(action$.ofType(READINESS_LICENSE_INFO_SET.CANCEL)))

export default combineEpics(
  getLicenseInformationEpic,
)
