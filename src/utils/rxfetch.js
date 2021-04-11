import { ajax as rxAjax } from 'rxjs/observable/dom/ajax'
import { commonHeaders } from './commonHeaders'

function read(name) {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`))
  return (match ? decodeURIComponent(match[3]) : null)
}

const getDefaultHeaders = () => {
  let defaultHeaders = {}

  const csrfToken = read(commonHeaders.xsrfCookieName)
  if (csrfToken) {
    defaultHeaders = {
      ...defaultHeaders,
      [commonHeaders.xsrfHeaderName]: csrfToken,
    }
  }

  return defaultHeaders
}

const mergeWithDefaultHeaders = headers => ({
  ...getDefaultHeaders(),
  ...headers,
})

export const ajax = (settings) => {
  // careful, we are not checking same-origin
  settings.headers = mergeWithDefaultHeaders(settings.headers)
  return rxAjax(settings)
}

export const post = (url, body, headers, responseType = 'json') => ajax({
  url, body, headers, method: 'POST', responseType,
})

export const put = (url, body, headers) => ajax({
  url, body, headers, method: 'PUT',
})

export const get = url => ajax({ url, responseType: 'json', method: 'GET' }).map(x => x.response)

export const deleteRest = (url, body = {}, headers = {}) => ajax({
  url, body, headers, method: 'DELETE',
})
