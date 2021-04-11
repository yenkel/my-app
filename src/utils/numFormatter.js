export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    // convert to K for number from > 1000 < 1 million
    return `${(num / 1000).toFixed(0)}k`
  } else if (num > 1000000) {
    // convert to M for number from > 1 million
    return `${(num / 1000000).toFixed(0)}m`
  } else if (num < 900) {
    // if value < 1000, nothing to do
    return num
  } else {
    return num
  }
}
