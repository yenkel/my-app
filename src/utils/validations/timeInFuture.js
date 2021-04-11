import moment from 'moment'

import { momentNowConvertedToTZ } from '../dateUtils'

const timeInFuture = (mValue, tz) => {
  const currentTimeTZ = momentNowConvertedToTZ(tz)
  if (mValue.isBefore(currentTimeTZ)) {
    return 'Time must not be in the past'
  }
}

export default timeInFuture
