import React from 'react'
import * as Sentry from '@sentry/browser'

import { COMMON_ERROR } from '../../utils/ErrorMessages'

export default class App extends React.Component {
  state = {
    hasError: false,
  }

  componentDidMount() {
    this.props.fetchData()
  }

  Logo = () => <img onLoad={e => e.target.classList.add('loaded')} src="/static/webapp/img/main-logo.svg" />

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    if (window.SENTRY_INITIALIZED && NODE_ENV !== 'development') { // eslint-disable-line
      Sentry.captureException(error, {
        release: GIT_VERSION, // eslint-disable-line
        extra: info,
        tags: {
          source: 'App.componentDidCatch',

          userEmail: this.props.userEmail,
          companyId: this.props.selfCompanyId,
        },
      })
    } else {
      console.error('App.componentDidCatch', error, info)
    }
  }

  render() {
    const { error, dataIsLoaded } = this.props

    if (error || this.state.hasError) {
      return (
        <div className="app-preloader">
          <div className="app-preloader-center-outer">
            <div className="app-preloader-center-middle">
              <this.Logo />
              <div className="app-preloader-error">
                {error?.detail || COMMON_ERROR}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (dataIsLoaded) {
      return (
        <div className="app-container">
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        </div>
      )
    }

    return ''
  }
}
