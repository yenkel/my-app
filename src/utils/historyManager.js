import queryString from 'query-string'

export const removeStateField = (history, nameForHistoryStore, filterName) => {
  const state = { ...history.location.state }
  delete state[nameForHistoryStore][filterName]
  history.replace({ ...history.location, state })
}

export const removeQueryStringProperty = (history, parsedQueryString, propertyName) => {
  delete parsedQueryString[propertyName]
  const qs = Object.keys(parsedQueryString).length ? `?${queryString.stringify(parsedQueryString)}` : undefined
  history.replace({
    pathname: history.location.pathname,
    search: qs,
  })
}
