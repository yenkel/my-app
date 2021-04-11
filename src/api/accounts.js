import { get } from '../utils/rxfetch'

export default () => ({
  getStatus() {
    return get('/members-api/account/status')
  },
})
