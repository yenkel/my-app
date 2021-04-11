import React from 'react'
import styled from 'styled-components'

import Checkbox from '../elements/Checkbox'

class CheckboxField extends React.Component {
  render() {
    const {
      input, label, className, InfoPopupComponent,
    } = this.props
    return (
      <div className={className}>
        <Checkbox
          handleChange={() => input.onChange(!input.value)}
          checked={input.value}
          id={label && label.replace(/ /g, '_')}
          name={label}
          label={label}
          InfoPopupComponent={InfoPopupComponent}
        />
      </div>
    )
  }
}

export default styled(CheckboxField)`
  height: 35px;
  display: flex;
  align-items: center;
`
