export const DEFAULT_REQUIRED_MESSAGE = 'Field is required'

const required = (value) => {
  if (value == null || value === '') {
    return DEFAULT_REQUIRED_MESSAGE
  }
}

export default required
