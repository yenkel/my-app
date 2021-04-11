import {
  email as emailRegex,
  address as addressRegex,
} from '../regex'

const DEFAULT_EMAIL_MESSAGE = 'Provide a valid email address'

/**
 * RFC 2822 spec From field
 * 1. John Miranda <john@gmail.com>
 * 2. john@gmail.com
 */
const emailFromSpec = (value) => {
  if (!value) return DEFAULT_EMAIL_MESSAGE
  const address = parseAddress(value)
  if (address.name) {
    if (!addressRegex.test(value)) return DEFAULT_EMAIL_MESSAGE
  } else if (!emailRegex.test(address.email)) return DEFAULT_EMAIL_MESSAGE
}

function parseAddress(address) {
  const extract = { name: '', email: '' }
  const emails = address.match(/[^@<\s]+@[^@\s>]+/g)

  if (emails) {
    extract.email = emails[0]
  }

  const names = address.split(/\s+/)

  if (names.length > 1) {
    names.pop()
    extract.name = names.join(' ').replace(/"/g, '')
  }

  return extract
}

export default emailFromSpec
