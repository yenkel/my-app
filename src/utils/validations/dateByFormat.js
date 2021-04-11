import moment from 'moment'

const dateByFormat = (value, format, strict = true) => {
  if (!moment(value, format, strict).isValid()) {
    return 'Date is missing or not valid'
  }
}

export default dateByFormat
