export const tryParse = (string, defaultval) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return defaultval
  }
}
