import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import {
  selectPartner,
  selectActualCompanyName,
  selectAllActualProperties,
} from '../../containers/App/selectors'

class PartnerAccess extends React.Component {
  renderChildren = (additionalProps = {}) => (
    <React.Fragment>
      {
        Array.isArray(this.props.children) ?
          this.props.children.map((children, index) => React.cloneElement(children || <React.Fragment>{children}</React.Fragment>, { key: index, ...additionalProps })) :
          React.cloneElement(this.props.children, { ...additionalProps })
      }
    </React.Fragment>
  )

  render() {
    const {
      partner,
      className,
      actualCompanyName,
      customReasonsText,
      checkPartnerAccess,
      allActualProperties,
    } = this.props

    if (!partner) return this.renderChildren()

    const {
      licenses, permissions, integrations, ff,
    } = allActualProperties
    const isAdmin = permissions.admin

    if (checkPartnerAccess(licenses, permissions, integrations, ff)) {
      return this.renderChildren({ isAdmin })
    }

    return (
      <div id="partnerAccess-notProvided" className={className}>
        <div className="tac bp mt">
          <img className="empty-box" src="/static/webapp/images/empty-box-open.svg" />
          <div><b>You do not have permission to access the requested page</b></div>
          <p>{`${actualCompanyName} does not meet the requirements due to one of the following reasons:`}</p>
          {
            customReasonsText ||
            <ol>
              <li>Company's license is inactive</li>
              <li>O365 or GSuite integration is not active</li>
              <li>You do not have required permissions</li>
            </ol>
          }
        </div>
      </div>
    )
  }
}

const render = connect(
  state => ({
    partner: selectPartner(state),
    actualCompanyName: selectActualCompanyName(state),
    allActualProperties: selectAllActualProperties(state),
  }),
  () => ({}),
)(PartnerAccess)

const styledRender = styled(render)`
  ol {
    text-align: left;
    width: 300px;
    display: block;
    margin: auto;
  }
`

export default withRouter(styledRender)
