import * as Sentry from '@sentry/browser'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'

import api from './api'
import ls from './utils/LocalStorage'

import createReducer from './reducer'
import createEpics, { epicsErrorHandler } from './epics'

export default () => {
  ls.init()

  const epicMiddleware = createEpicMiddleware(createEpics(), {
    dependencies: {
      ls,
      api,
      epicsErrorHandler,
    },
  })

  const requestErrorReporter = store => next => (action) => {
    if (action.type.indexOf('_CATCH_ERROR') !== -1) {
      if (
        window.SENTRY_INITIALIZED &&
        (action.error == null || ![401, 0].includes(action.error.status))
      ) {
        Sentry.captureException(new Error(`[${action.error.status}] ${action.type}`), {
          extra: { action },
          tags: {
            source: 'error during an action',
            statusCode: action.error.status,

            userEmail: store.getState().app.data.email,
            companyId: store.getState().app.data.id,
            msp: !!store.getState().app.data.partner,
          },
        })
      }
    }
    return next(action)
  }

  const middleware = [
    epicMiddleware,
    thunk.withExtraArgument({ api }),
    requestErrorReporter,
  ]

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false, trace: true }) : // eslint-disable-line
      compose

  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(createReducer(), enhancer)

  return store
}
