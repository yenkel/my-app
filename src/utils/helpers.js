import _isFinite from 'lodash/isFinite'
import moment from 'moment'
import numeral from 'numeral'

export const arrayOfObjectsToObject = (array, objectKey, defaultValue) => array
  .reduce((prev, curr) => ({ ...prev, [curr[objectKey]]: defaultValue || curr }), {})

export const arrayOfObjectsToObjectsOfArraysByKey = (array, objectKey) => array
  .reduce((prev, curr) => (prev[curr[objectKey]] ?
    { ...prev, [curr[objectKey]]: [...prev[curr[objectKey]], curr] } :
    { ...prev, [curr[objectKey]]: [curr] }), {})

export const checkAllObjectValuesMatchExpectations = (object, expectation) => !!Object
  .keys(object)
  .filter(elem => object[elem] === expectation)
  .length

export const sum = (a, b) => a + b

export const alphabeticalSort = (arr, property) => arr.sort((a, b) => {
  const labelA = a[property].toLowerCase()
  const labelB = b[property].toLowerCase()

  if (labelA > labelB) return 1
  else if (labelA < labelB) return -1
  else return 0
})

const padZero = (number) => {
  if (_isFinite(number)) {
    return number.toString().length === 1 ? `0${number}` : number
  }
  return '00'
}

export const cutArrayToTopAndBottom = (array) => {
  const countPerSubtable = Math.min(10, array.length) / 2

  return {
    top: array.slice(0, countPerSubtable),
    bottom: array.slice(array.length - countPerSubtable),
  }
}

export const formatSecondsToDuration = (durationSeconds) => {
  const seconds = durationSeconds % 60
  const minutes = Math.floor((durationSeconds / 60) % 60)
  const hours = Math.floor(durationSeconds / (60 * 60))

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
}

export const timeStringToSeconds = (timeString) => {
  let result = 0
  try {
    let m = timeString.match(hours)
    if (m) {
      result += parseInt(m) * 60 * 60
    }
    m = timeString.match(minutes)
    if (m) {
      result += parseInt(m) * 60
    }
    m = timeString.match(seconds)
    if (m) {
      result += parseInt(m)
    }
  } catch (e) {
    return 0
  }

  return result
}

export const normalizePercent = p => Math.round((p * 100) * 100) / 100

export const normalizeReportData = (reportData) => {
  reportData.reportsNum = reportData.reportsNum.map(n => (n === 'N/A' ? 0 : n))
  reportData.mitigationTime = reportData.mitigationTime.map(t => (t === 'No Mitigation' ? 0 : timeStringToSeconds(t)))
  reportData.firstReport = reportData.firstReport.map(t => (t === 'No Reports' ? 0 : (typeof t === 'string' ? timeStringToSeconds(t) : t)))

  // put all more than 5 times clicks in the 5 times bucket.
  const clkFreq = reportData.clickFrequency
  reportData.clickFrequency = Object.keys(clkFreq).reduce((acc, key) => {
    if (key <= 5) {
      acc[key] = clkFreq[key]
    } else {
      acc[5] = acc[5] ? acc[5].concat(clkFreq[key]) : clkFreq[key]
    }
    return acc
  }, {})

  return reportData
}

const hours = /(\d+)h/g
const minutes = /(\d+)m/g
const seconds = /(\d+)s/g

export const momentize = campaigns => campaigns.map(c => ({
  ...c,
  scheduleTime: moment(c.scheduleTime),
  closeTime: moment(c.closeTime),
}))

export const formatNumber = (value, zeroAs = '0') => (zeroAs && value == 0 ? zeroAs : numeral(value).format('0,0'))

const URI_PREFIX = 'data:text/csv;charset=utf-8,%EF%BB%BF'

export const objects2csvuri = (array, props, titles) => {
  let content = titles ? `${titles.join(',')}\n` : `${props.join(',')}\n`
  content += array.map(item => props.map(prop => item[prop]).join(',')).join('\n')

  return URI_PREFIX + encodeURIComponent(content)
}

export const showShortAddress = (address) => {
  if (!address) return ''
  if (address.length < 40) return address
  const maxPartLength = 30
  let localPart
  let domain
  const splited = address.split(/(?=@)/g)
  switch (splited.length) {
    case 1: {
      const res = splited[0]
      if (res.split('.')[0].length > maxPartLength) {
        return `${res.split('.')[0].substring(0, 27)}...${res.split('.').filter((e, i) => i !== 0).join('.')}`
      }
      return res
    }
    case 2: case 3: case 4: case 5: {
      localPart = splited[0]
      domain = address.split(/(?=@)/g).filter((e, i) => i !== 0).join('')
      if (localPart.length > maxPartLength) {
        localPart = `${localPart.substring(0, 27)}...`
      }
      domain = domain.split('.').map((elem) => {
        if (elem.length > maxPartLength) return `${elem.substring(0, 27)}...`
        return elem
      }).join('.')
      return localPart + domain
    }
    default:
      return address
  }
}

export function xhrExtractFileName(xhr) {
  let filename = ''
  const disposition = xhr.getResponseHeader('Content-Disposition')
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }
  return filename
}

export function debounce(func, wait, immediate) {
  let timeout
  const cb = function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) { func.apply(context, args) }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait || 200)
    if (callNow) { func.apply(context, args) }
  }
  cb.cancel = function cancel() {
    clearTimeout(timeout)
  }
  return cb
}

export function genId(length = 5) {
  return Math.random().toString(36).substring(length)
}

/**
 *
 * @param {Object} o - Object to search in
 * @param {String} fieldName - Name to check
 * @param {Any} value - Value to compare
 * @param {Array} results (optional)
 *
 * Function is searching in nested object by fieldName eq value
 * and returning first object which matched conditional.
 *
 * @param {Array} results when specified function is returning all occurrences.
 */
export function findInNestedObject(o, fieldName, value, results) {
  // Early return
  if (o[fieldName] === value) {
    if (results) {
      results.push(o)
    } else {
      return o
    }
  }
  let result
  let p
  for (p in o) {
    if (o.hasOwnProperty(p) && typeof o[p] === 'object' && o[p] !== null) {
      result = findInNestedObject(o[p], fieldName, value, results)
      if (result) {
        return result
      }
    }
  }
  return result
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
