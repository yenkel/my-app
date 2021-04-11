import moment from 'moment'

const dateAfterToday = (value) => {
  if (moment(value).isBefore(moment(), 'day')) {
    return 'Date must not be in the past'
  }
}

export default dateAfterToday
