import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import {
  DATA_REQUEST_ASYNC,
} from './constants'

import {
  fetchDataSuccess,
  fetchDataError,
} from './actions'

import { initSentry } from '../../index'

const fetchDataEpic = (action$, store, { api, epicsErrorHandler }) => action$
  .ofType(DATA_REQUEST_ASYNC.INITIATE)
  .mergeMap(() => api.accounts.getStatus()
    .map((response) => {
      initSentry(response.environment)
      return fetchDataSuccess(response)
    })
    .catch(error => Observable.of(epicsErrorHandler(fetchDataError, error)))
    .takeUntil(action$.ofType(DATA_REQUEST_ASYNC.CANCEL)))

export default combineEpics(
  fetchDataEpic,
)
