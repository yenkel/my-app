import { email as emailRegex } from '../regex'

const DEFAULT_EMAIL_MESSAGE = 'Provide a valid email address'

const email = (value) => {
  if (value && !emailRegex.test(value)) { return DEFAULT_EMAIL_MESSAGE }
}

export default email
