import moment from 'moment'
import 'moment-timezone'

export const DATE_VALUES = {
  DAY: 0,
  YESTERDAY: 8,
  WEEK: 1,
  MONTH: 7,
  THREE_MONTHS: 2,
  SIX_MONTHS: 3,
  PAST_YEAR: 4,
  CURRENT_YEAR: 5,
  CUSTOM: 9,
  ALL_TIME: 6,
}

export const DATE_FILTERS = [
  { value: DATE_VALUES.DAY, label: 'Today' },
  { value: DATE_VALUES.YESTERDAY, label: 'Yesterday' },
  { value: DATE_VALUES.WEEK, label: 'Last 7 days' },
  { value: DATE_VALUES.MONTH, label: 'Last 30 days' },
  { value: DATE_VALUES.THREE_MONTHS, label: 'Last 90 days' },
  { value: DATE_VALUES.CURRENT_YEAR, label: 'Current year' },
  { value: DATE_VALUES.PAST_YEAR, label: 'Last year' },
  { value: DATE_VALUES.ALL_TIME, label: 'All times' },
  { value: DATE_VALUES.CUSTOM, label: 'Custom Range' },
]

export const CAMPAIGN_DATE_FILTERS = ['All Time', 'Last month', 'Last 3 months', 'Last year', 'Custom Range']

const fd = (date, format, empty = 'N/A') => (date ? moment(date).format(format) : empty)

export const formatWithoutTimezone = (date, format, empty = 'N/A') => (date ? moment(date).utc().format(format) : empty)

export const formatDate = (date, empty) => fd(date, 'D-MMM-YYYY, h:mm:ss A', empty)
export const formatDateShort = (date, empty) => fd(date, 'D-MMM-YYYY', empty)
export const formatDateLog = (date) => {
  if (moment(date).isAfter(moment().subtract(12, 'hours'))) {
    return moment(date).fromNow()
  } else if (moment(date).isSame(moment(), 'day')) {
    return `Today ${moment(date).format('HH:MM A')}`
  } else {
    return fd(date, 'D-MMM-YYYY, HH:MM A')
  }
}
export const smartFormat = (date) => {
  const mdate = moment(date)
  const thismoment = moment()
  return mdate.isSame(thismoment, 'day') ?
    mdate.format('hh:mm A') : mdate.format('DD-MMM-YYYY')
}

export const formatCommentDate = (date) => {
  if (moment(date).isAfter(moment().subtract(1, 'day'))) {
    return moment(date).fromNow()
  }
  return fd(date, 'D-MMM-YYYY')
}

export const getCustomRange = dateFilter => ({
  value: DATE_VALUES.CUSTOM,
  label: `${formatWithoutTimezone(dateFilter[0], 'D-MMM-YYYY')} - ${formatWithoutTimezone(dateFilter[1], 'D-MMM-YYYY')}`,
})

export const mapDateFilterToFormattedDate = {
  Today: formatDateShort(moment()),
  Yesterday: formatDateShort(moment().subtract(1, 'days')),
  'Last 7 days': formatDateShort(moment().subtract(7, 'days')),
  'Last 30 days': formatDateShort(moment().subtract(30, 'days')),
  'Last 90 days': formatDateShort(moment().subtract(90, 'days')),
  'Last year': formatDateShort(moment().subtract(360, 'days')),
  'Current year': formatDateShort(moment().startOf('year')),
}

export const getParsedDateUntilToday = (currentDateFilter) => {
  if (currentDateFilter === DATE_VALUES.ALL_TIME) return '(All times)'

  const selectedDate = mapDateFilterToFormattedDate[DATE_FILTERS.find(val => val.value === currentDateFilter)?.label]

  if (Array.isArray(currentDateFilter)) {
    return (`(${getCustomRange(currentDateFilter).label})`)
  } else if (selectedDate) {
    return (`(${selectedDate} - ${currentDateFilter !== 0 ? formatDateShort(moment().subtract(1, 'days')) : selectedDate})`)
  }
}

export const momentNowConvertedToTZ = tz => moment(moment(moment.tz(moment(), tz).format('LT'), ['h:mm A']).format('HH:mm'), 'hh:mm')
export const momentConvertedToTZ = (m, tz) => moment(moment(moment.tz(m, tz).format('LT'), ['h:mm A']).format('HH:mm'), 'hh:mm')

export const WIZARD_DATE_FORMAT = 'YYYY-MM-DD'
export const LAUNCH_TIME_FORMAT = 'HH:mm'

export const getWeekendDays = workdays => (workdays === 1 ? [0, 6] : [5, 6])

export const getNextWorkingDay = (mDate, weekendDays, includeToday = true) => {
  if (includeToday) {
    while (true) {
      if (weekendDays.includes(mDate.day())) {
        mDate = mDate.add(1, 'day')
      } else return mDate
    }
  } else {
    while (true) {
      mDate = mDate.add(1, 'day')
      if (!weekendDays.includes(mDate.day())) return mDate
    }
  }
}

export const addWorkingDays = (mFromDate, days, weekendDays) => {
  while (days > 0) {
    mFromDate = mFromDate.add(1, 'day')
    if (!weekendDays.includes(mFromDate.day())) {
      days -= 1
    }
  }
  return mFromDate
}

export const getCountOfWorkingDays = (mFromDate, mToDate, weekendDays) => {
  if (!moment(mFromDate).isValid() || !moment(mToDate).isValid()) return null
  let count = 0

  while (!moment(mFromDate.format(WIZARD_DATE_FORMAT)).isSame(mToDate.format(WIZARD_DATE_FORMAT))) {
    mFromDate = mFromDate.add(1, 'day')

    if (!weekendDays.includes(mFromDate.day())) {
      count += 1
    }
  }
  return count
}

export const castFloatToHoursAndMinutes = (number) => {
  const parsedTimeObj = {
    hours: 0,
    minutes: 0,
  }
  // Separate the int from the decimal part
  if (number) {
    const hour = Math.floor(number)
    const decpart = Number((number - hour).toFixed(2)) * 60
    parsedTimeObj.hours = hour
    parsedTimeObj.minutes = decpart
  }
  return parsedTimeObj
}

