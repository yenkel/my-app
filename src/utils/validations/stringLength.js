const stringLength = length => (value) => {
  if (value?.length > length) {
    return `Field cannot be longer than ${length} characters`
  }
}

export default stringLength
