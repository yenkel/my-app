import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.styl'

import createReducer from '../reducer'

import App from '../containers/App'

import Navigation from '../containers/Navigation'
import Placeholder from './layouts/Placeholder'

import RefreshErrorScreen from './layouts/RefreshErrorScreen'

const handleChunkLoadError = (e) => {
  window.DISABLE_SENTRY = true
  ReactDOM.render(
    <RefreshErrorScreen />,
    document.getElementById('app'),
  )
}

const Dashboard = React.lazy(() => import('../containers/Dashboard').catch(handleChunkLoadError))

require('./styles/antd.less')
require('./styles/root.styl')
require('./styles/scroll.styl')

let activeReducer

const createComponentWithDataLayer = (Component, dataLayerName, store) => (props) => {
  if (!activeReducer || activeReducer !== dataLayerName) {
    activeReducer = dataLayerName
    const nextReducer = require(`../containers/${dataLayerName}/reducer`).default
    store.replaceReducer(createReducer({
      [dataLayerName.toLowerCase()]: nextReducer()(undefined, {}),
    }))
  }

  return <Component {...props} />
}

const RootContainer = props => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App>
        <Navigation />
        <React.Suspense fallback={<Placeholder />}>
          <Switch>
            <Route path="/dashboard" component={createComponentWithDataLayer(Dashboard, 'Dashboard', props.store)} />
          </Switch>
        </React.Suspense>
      </App>
    </BrowserRouter>
  </ThemeProvider>
)

export default hot(module)(RootContainer)
