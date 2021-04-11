import React from 'react'
import styled from 'styled-components'

import Popup from '../elements/Popup'

function Input({ popup, className, ...rest }) {
  let Component = <input className={className} {...rest} />

  if (popup) {
    Component = <Popup
      position={popup?.position || 'top center'}
      ContentComponent={popup ? <>{popup.text}</> : null}
      TriggerComponent={Component}
    />
  }

  return Component
}

export default styled(Input)`
  border: none;
  border-bottom: 1px solid ${props => (props.invalid ? props.theme.red : props.theme.primaryColor)};
  height: 35px;
  font-size: 14px;
  background-color: transparent;
  width: ${props => props.width || '100%'};
  outline: none;
  border-radius: 0;
  &.error {
    border-color: ${props => props.theme.red};
  }
  &:disabled {
    opacity: 0.3;
  }
`
