import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import classnames from 'classnames'

import Icon from '../common/Icon'

class Label extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
    customClassName: PropTypes.string,
    iconName: PropTypes.string,
    iconAction: PropTypes.func,
    iconTitle: PropTypes.string,
    customColor: PropTypes.object,
  }

  handleIconClick = (e) => {
    if (typeof this.props.iconAction === 'function') {
      this.props.iconAction(e)
    }
  }

  render() {
    const {
      content,
      className,
      customClassName,
      iconName,
      iconTitle,
    } = this.props

    const ccn = classnames(
      'is-label',
      className,
      customClassName,
    )

    return (
      <span
        className={ccn}
      >
        {content}
        {
          iconName &&
          <Icon
            size="10px"
            name={iconName}
            onClick={this.handleIconClick}
            title={iconTitle}
          />
        }
      </span>
    )
  }
}

export default styled(Label)`
  color: ${props => (props.customColor ? props.customColor.text : '#F7FAFF')};
  margin: 1px;
  padding: 3px 10px;
  font-size: 10px;
  display:inline-block;
  text-align: center;
  border-radius: 5px;
  background-color: ${props => (props.customColor ? props.customColor.background : props.theme.primaryColor)};
  i {
    margin-left: 5px;
    &:hover {
      opacity: 0.6;
    }
  }
`
