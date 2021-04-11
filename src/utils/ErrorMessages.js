// for 500 status
export const COMMON_ERROR = 'Looks like something went wrong on our end. Please try again later.'

export const mapMsgByStatus = {
  500: COMMON_ERROR,
}

export const extractErrorMessage = (error) => {
  if (
    !error.response ||
    error.status === 500 ||
    !Object.keys(error.response).length
  ) return COMMON_ERROR
  else if (error.response.message) return error.response.message
  else {
    return Object.keys(error.response)
      .map(elem => `${elem}: ${(Array.isArray(error.response[elem]) ? error.response[elem][0] : error.response[elem])}`)
      .join('; ')
  }
}
