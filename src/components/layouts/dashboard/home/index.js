import React from 'react'

import Licenses from '../../../../containers/Dashboard/Home/Licenses'

require('../../../styles/layouts/dashboard/home/home.styl')

export default class Home extends React.Component {
  render() {
    return (
      <div className="home dashboard-layout">
        <div className="lower-side mb">
          <div className="heartbeat-container">
            <Licenses />
          </div>
        </div>
      </div>
    )
  }
}
