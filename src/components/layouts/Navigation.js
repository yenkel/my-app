import React from 'react'
import cls from 'classnames'

require('../styles/layouts/navigation.styl')

const ifSelected = (pathname, url) => (pathname?.includes(url) ? 'selected' : '')

class NavigationLink extends React.Component {
  handlerOnClick = () => {
    const {
      handleNavigationClick, pathname,
    } = this.props
    handleNavigationClick(pathname)
  }

  render() {
    const { children, id } = this.props
    return (
      <div
        id={id}
        className="navigation-item-content"
        onClick={this.handlerOnClick}
      >
        {children}
      </div>
    )
  }
}

const RegularNav = ({ app, pathname, handleNavigationClick }) => {
  const dashboardSelected = ifSelected(pathname, '/dashboard')
  const partnersSelected = ifSelected(pathname, '/partners')

  return (
    <React.Fragment>
      <div className="navigation-group">
        {
          app.permissions.admin &&
          <div className={cls('navigation-item', 'gt-p', dashboardSelected, partnersSelected)} id="home_button">
            {
              app.ff.DISABLE_ROOT_DASHBOARD ?
                <a href={app.partner ? '/partners' : '/dashboard'} className="navigation-item-content">
                  <img src="/static/webapp/images/navigation/nav-dashboard.png" />
                  <span>Home</span>
                </a> :
                <NavigationLink
                  pathname={app.partner ? '/partners' : '/dashboard'}
                  handleNavigationClick={handleNavigationClick}
                  currentUrl={pathname}
                >
                  <img src="/static/webapp/images/navigation/nav-dashboard.png" />
                  <span>Home</span>
                </NavigationLink>
            }
          </div>
        }
      </div>
    </React.Fragment>
  )
}

export default class Navigation extends React.Component {
  handleNavigationClick = (url) => {
    this.props.history.push(url)
  }

  render() {
    const {
      app, location,
    } = this.props

    return (
      <div className={cls('navigation', { dn: location.pathname === '/kpi/' })}>
        <a className="navigation-logo" href={app.partner ? '/partners' : '/dashboard'} />
        <span className="icon navigation-toggle">
          <img src="/static/webapp/images/hamburger-icon.svg" />
        </span>
        <div id="main_navigation_toolbar" className="navigation-content">
          <RegularNav
            app={app}
            pathname={location.pathname}
            handleNavigationClick={this.handleNavigationClick}
          />
        </div>
      </div>
    )
  }
}
