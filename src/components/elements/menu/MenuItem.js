import React from 'react'
import styled from 'styled-components'
import cls from 'classnames'

const MenuItem = (props) => {
  const {
    link,
    valid,
    location,
    children,
    className,
    showValidationIcon,
    ...menuItemProps
  } = props

  return (
    <div
      {...menuItemProps}
      className={cls('menu-item', className)}
    >
      {
        showValidationIcon &&
        <img
          src={
            valid ?
              require('./assets/valid.svg') :
              require('./assets/invalid.svg')
          }
          style={{ paddingRight: '14px' }}
        />
      }
      {children}
    </div>
  )
}

export default styled(MenuItem)`
  color: #F9FBFF;
  font-size: 13px;
  ${props => props.selected && 'background: #262A3B; font-weight: bold;'};

  padding: ${props => (props.subitem ? '7.5px 0 7.5px 38px' : '17.5px 0 17.5px 23px')};

  ${props => (props.category ? 'cursor: default;' : 'cursor: pointer;')}

  :hover {
    ${props => !props.selected && !props.category && 'background: #6D7180;'}
  }
`
