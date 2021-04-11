const DEFAULT_INVALID_JSON_MESSAGE = 'Invalid json'

export const validateJson = (jsonString) => {
  try {
    JSON.parse(jsonString)
  } catch (e) {
    return false
  }
  return true
}

const json = (message = DEFAULT_INVALID_JSON_MESSAGE) =>
  (value) => {
    if (!validateJson(value)) {
      return message
    }
  }

export default json
