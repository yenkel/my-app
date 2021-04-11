const DEFAULT_PORT_MESSAGE = 'Enter a number from 1 to 65535'

const validPort = port => (/^\d+$/.test(port) && Number(port) > 0 && Number(port) <= 65535)

const tcpPort = (message = DEFAULT_PORT_MESSAGE) => (value) => {
  if (value && !validPort(value)) {
    return message
  }
}

export default tcpPort
