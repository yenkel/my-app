import {
  DATA_REQUEST_ASYNC,
  REFETCH_OWNER_STATUS_ASYNC,
} from './constants'

export const fetchData = () => ({ type: DATA_REQUEST_ASYNC.INITIATE })
export const fetchDataSuccess = data => ({ type: DATA_REQUEST_ASYNC.SUCCESS, payload: { data } })
export const fetchDataError = error => ({ type: DATA_REQUEST_ASYNC.ERROR, error })
export const fetchDataCancel = () => ({ type: DATA_REQUEST_ASYNC.CANCEL })

export const refetchOwnerStatus = () => ({ type: REFETCH_OWNER_STATUS_ASYNC.INITIATE })
export const refetchOwnerStatusSuccess = data => ({ type: REFETCH_OWNER_STATUS_ASYNC.SUCCESS, payload: { data } })
export const refetchOwnerStatusError = error => ({ type: REFETCH_OWNER_STATUS_ASYNC.ERROR, error })
export const refetchOwnerStatusCancel = () => ({ type: REFETCH_OWNER_STATUS_ASYNC.CANCEL })

export default { // to props
  fetchData,
  fetchDataCancel,
}
