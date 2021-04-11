export const findElementAboveByClass = (element, className) => {
  while (true) {
    const classes = element.className.split(' ')
    if (classes.includes(className)) return element
    else if (element === document.body) return null
    else element = element.parentElement
  }
}
