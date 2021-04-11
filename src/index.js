import 'rxjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'

import configureStore from './store'

import RootContainer from './components/RootContainer'
import '../webpack-es6-public-path'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <RootContainer store={store} />
  </Provider>,
  document.getElementById('app'),
)

export const initSentry = (env) => {
  Sentry.init({
    dsn: 'https://266f73f01f09432ebf01138bd5f050e6@o86130.ingest.sentry.io/1259170',
    release: GIT_VERSION,
    environment: env,
    beforeSend(event) {
      console.log(event)
      if (env === 'ONPREMISE' || window.DISABLE_SENTRY) return null
      else return event
    },
  })

  window.SENTRY_INITIALIZED = true
}
