import React from 'react'
import Input from './Input'
import withValidation from './withValidation'

const TextInput = props => (
  <Input {...props} type={props.type} />
)

TextInput.defaultProps = {
  type: 'text',
}

TextInput.Field = withValidation(TextInput)

export default TextInput
