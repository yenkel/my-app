import moment from 'moment'

const wizardDate = (value) => {
  if (!moment(value, 'YYYY-M-D', true).isValid()) {
    return 'Date is not valid'
  }
}

export default wizardDate
