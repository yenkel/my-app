import moment from 'moment'

const workingHours = (value, format) => {
  if (!moment(value, format).isBetween(moment('08:59', 'hh:mm'), moment('18:01', 'hh:mm'))) {
    return 'Select working hours (9AM to 6PM)'
  }
}

export default workingHours
