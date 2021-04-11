import numeral from 'numeral'
import isFinite from 'lodash/isFinite'
import Template from 'lodash/template'

export const DEFAULT_NUMBER_MESSAGE = 'Enter a number'
const RANGE_TEMPLATE = Template('Enter a value between <%= min %> and <%= max %>')
const MIN_TEMPLATE = Template('Enter a value greater than or equal to <%= min %>')
const MAX_TEMPLATE = Template('Enter a value less than or equal to <%= max %>')

const formatNumber = num => numeral(num).format('0,0')

const getErrorMessage = ({ min, max, message }) => {
  if (message) return message
  min = parseInt(min)
  max = parseInt(max)
  const minIsDefined = isFinite(min)
  const maxIsDefined = isFinite(max)

  if (minIsDefined && maxIsDefined) {
    return RANGE_TEMPLATE({ min: formatNumber(min), max: formatNumber(max) })
  }
  if (maxIsDefined) {
    return MAX_TEMPLATE({ max: formatNumber(max) })
  }
  return MIN_TEMPLATE({ min: formatNumber(min) })
}

// if valid returns undefined otherwise returns the error message.
const validateNumber = (conf = {}) => (value) => {
  if (!value) return
  value = parseInt(value)
  const max = parseInt(conf.max)
  const min = parseInt(conf.min)

  if (!isFinite(value)) {
    return conf.message || DEFAULT_NUMBER_MESSAGE
  }

  if (isFinite(min) && value < min) return getErrorMessage(conf)

  if (isFinite(max) && value > max) return getErrorMessage(conf)
}

export default validateNumber
