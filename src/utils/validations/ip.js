const ipRE = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/
const checkIP = ip => !ip || ipRE.test(ip)

const DEFAULT_IP_ERROR_MESSAGE = 'Enter a valid ip'

const ip = (message = DEFAULT_IP_ERROR_MESSAGE) => (value, allValues) => {
  if (value && !checkIP(value)) { return message }
}

export default ip
