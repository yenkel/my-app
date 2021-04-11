/* eslint-disable no-nested-ternary */

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import CenteredLoader from './CenteredLoader'
import ErrorContainer from './ErrorContainer'
import PartnerAccess from './PartnerAccess'

export default class DataContainer extends React.Component {
  renderChildren = () => (
    <React.Fragment>
      {
        this.props.error &&
          <ErrorContainer error={this.props.error} />
      }
      <React.Fragment>
        {
              Array.isArray(this.props.children) ?
                this.props.children.map((children, index) => React.cloneElement(children, { key: index })) :
                React.cloneElement(this.props.children)
            }
      </React.Fragment>
    </React.Fragment>
  )

  render() {
    const {
      style,
      loader,
      onClick,
      className,
      partnerAccess,
    } = this.props

    return (
      <div
        style={style || {}}
        onClick={onClick}
        className={cls(className)}
      >
        {
          loader ?
            <CenteredLoader /> :
            partnerAccess ?
              <PartnerAccess
                companyFilter={partnerAccess.companyFilter}
                checkPartnerAccess={partnerAccess.checkPartnerAccess}
              >
                {this.renderChildren()}
              </PartnerAccess> :
              this.renderChildren()
        }
      </div>
    )
  }
}

DataContainer.propTypes = {
  loader: PropTypes.bool,
  error: PropTypes.oneOfType([
    () => null,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      refreshAction: PropTypes.func.isRequired,
    }),
  ]),
}
