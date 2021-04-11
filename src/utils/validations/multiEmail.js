import { email as emailRegex } from '../regex'

const DEFAULT_EMAIL_MESSAGE = 'Enter valid email address seperated by ,'

const multiEmail = (message = DEFAULT_EMAIL_MESSAGE) => (value) => {
  const isInvalid = value && value.split(',').map(email => emailRegex.test(email.trim())).includes(false)
  if (isInvalid) { return message }
}

export default multiEmail
