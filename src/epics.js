import { combineEpics } from 'redux-observable'

import { extractErrorMessage } from './utils/ErrorMessages'

import appEpics from './containers/App/epics'
import dashboardEpics from './containers/Dashboard/epics'

export const epicsErrorHandler = (func, error) => {
  if ([401, 403].includes(error.status)) {
    window.location = '/signin'
  } else {
    return func({
      title: 'Error',
      detail: extractErrorMessage(error),
      status: error.status,
      response: error.response,
    })
  }
}

export default function createEpics() {
  return combineEpics(
    appEpics,
    dashboardEpics,
  )
}
