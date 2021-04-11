import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ValidationMessage = (meta) => {
  if (meta.error && meta.touched) {
    return <Error className="field-error" style={{ color: 'red' }}>{meta.error}</Error>
  }
  return null
}

const withValidation = InputComponent => props => (
  <FieldContainer>
    <InputComponent
      {...props}
      {...props.input}
      {...props.selectProps}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
    />
    <ValidationMessage {...props.meta} />
  </FieldContainer>
)

export default withValidation

withValidation.propTypes = {
  meta: PropTypes.object,
}

const FieldContainer = styled.div`
  position: relative;
`

const Error = styled.span`
  position: absolute;
  left: 0;
  bottom: -20px;
  color: red;
  white-space: nowrap;
`
