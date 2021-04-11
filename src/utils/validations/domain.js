import domainVal from 'domain-regex'

const DEFAULT_DOMAIN_ERROR_MESSAGE = 'Enter a valid domain'

const domain = (message = DEFAULT_DOMAIN_ERROR_MESSAGE) => (value) => {
  if (value && !domainVal().test(value)) { return message }
}

export default domain
