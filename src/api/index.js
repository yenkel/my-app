import { request } from '../utils/request'

import accounts from './accounts'
import companies from './companies'

export default {
  accounts: accounts(request),
  companies: companies(request),
}
