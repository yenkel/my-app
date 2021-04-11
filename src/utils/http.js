import axios from 'axios'
import { commonHeaders } from './commonHeaders'

const http = axios.create(commonHeaders)

http.putFile = (url, fieldName, file, method, config = {}) => {
  method = (method && method.toLowerCase()) || 'put'
  const fd = new FormData()
  fd.append(fieldName, file)
  return http[method](url, fd, config)
}

http.sendMultipartForm = (url, form, method, config = {}) => {
  const fd = new FormData()
  Object.keys(form).map(elem => fd.append(elem, form[elem]))
  return http[(method && method.toLowerCase()) || 'post'](url, fd, config)
}

http.interceptors.response.use(
  response => response,
  (error) => {
    const response = error.response
    const message = response.data && response.data.message || 'Error'
    return Promise.reject(message)
  }
)

export default http
