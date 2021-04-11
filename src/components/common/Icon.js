import React from 'react'
import styled from 'styled-components'
import cls from 'classnames'

/**
 * Font Awesome 3.2.1
 * https://fontawesome.com/v3.2.1/icons/
*/

class Icon extends React.Component {
  handlerOnClick = (e) => {
    const { disabled, onClick } = this.props
    if (!disabled && typeof onClick === 'function') onClick(e)
  }

  render() {
    const {
      name, className, title, id,
    } = this.props

    // TODO: implement error throw
    if (!name) return ''

    return (
      <i
        title={title || ''}
        className={cls('tm-icon', `icon-${name}`, className)}
        onClick={this.handlerOnClick}
        name={name}
        id={id}
      />
    )
  }
}

export default styled(Icon)`
  color: ${props => props.color || 'inherit'};
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: ${props => (props.size ? props.size : '14px')};
  ${props => props.rotate && `
    animation:spin 2s linear infinite;
    @keyframes spin {
      0% {
        transform:rotate(0deg);
      }
      100% {
        transform:rotate(360deg);
      }
    }
  `}
`
