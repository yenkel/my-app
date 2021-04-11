import 'whatwg-fetch'
import { commonHeaders } from './commonHeaders'

function request(url, method, body) {
  const options = {
    method,
    headers: {
      'Content-type': 'application/json',
      ...commonHeaders,
    },
    credentials: 'include',
    body: body && JSON.stringify(body),
  }

  if (method === 'PUT' || method === 'POST') {
    options.headers = Object.assign({}, getCsfrHeader(), options.headers)
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}

function getCsfrHeader() {
  const csrfToken = getCookieField(commonHeaders.xsrfCookieName)
  return csrfToken ? { [commonHeaders.xsrfHeaderName]: csrfToken } : {}
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status == 401) {
    window.location = '/signin'
  }
  return response

  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }
  //
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

function getCookieField(name) {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`))
  return (match ? decodeURIComponent(match[3]) : null)
}

export { request }
