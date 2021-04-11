import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../../containers/Dashboard/Home'

import Menu from '../../../containers/Dashboard/Menu'

export default class Dashboard extends React.Component {
  componentDidMount() {
    this.props.addItems({
      dashboard: {
        name: 'Dashboards',
        category: true,
        sub: {
          home: { name: 'Home', link: '/dashboard' },
        },
      },
    })
  }

  render() {
    return (
      <div className="root dashboard">
        <Menu />
        <div className="content-container-with-menu">
          <Switch>
            <Route path="/dashboard" exact component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}
