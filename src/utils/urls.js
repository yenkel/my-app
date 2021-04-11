export const matchURL = url => (
  window.location.pathname === url ||
  `${window.location.pathname}/` === url ||
  window.location.pathname === `${url}/`
)

export const buildURL = (url, params) => {
  const existingParams = Object.keys(params)
    .reduce((prev, curr) => {
      if (params[curr] !== '' && params[curr] !== undefined) return { ...prev, [curr]: params[curr] }
      else return prev
    }, {})

  if (Object.keys(existingParams).length) {
    Object.keys(existingParams).forEach((key, index) => {
      const symbol = index === 0 && url.indexOf('?') === -1 ? '?' : '&'
      url += `${symbol}${key}=${existingParams[key]}`
    })
  }

  return url
}
