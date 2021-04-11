import validateNumber from './number'
import required, { DEFAULT_REQUIRED_MESSAGE } from './required'
import email from './email'
import dateAfterToday from './dateAfterToday'
import wizardDate from './wizardDate'
import dateByFormat from './dateByFormat'
import workingHours from './workingHours'
import timeInFuture from './timeInFuture'
import emailFromSpec from './emailFromSpec'
import stringLength from './stringLength'

import { confirmPassword } from './passwordValidation'

const positiveNumber = validateNumber({ min: 1 })

const notEmptyArray = arr => (arr?.length ? undefined : DEFAULT_REQUIRED_MESSAGE)

const validateForm = (form, validations, parentClassName) => {
  const mapDOMFields = {}
  document.querySelectorAll(`.${parentClassName} input`).forEach((elem) => {
    elem.classList.remove('error')
    mapDOMFields[elem.name] = elem
  })

  const notValidNames = Object.keys(form)
    .filter(fieldName => !validations[fieldName]() && !mapDOMFields[fieldName].disabled)
    .map(fieldName => mapDOMFields[fieldName].classList.add('error'))

  return !notValidNames.length
}

const validateAll = arr => arr.filter(res => res)[0]

export {
  validateAll,
  dateByFormat,
  workingHours,
  timeInFuture,
  required,
  positiveNumber,
  email,
  confirmPassword,
  notEmptyArray,
  dateAfterToday,
  validateForm,
  wizardDate,
  emailFromSpec,
  stringLength,
}
