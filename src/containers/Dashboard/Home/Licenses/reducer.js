import {
  READINESS_LICENSE_INFO_SET,
} from './constants'
import { COMPANY_FILTER_CHANGE } from '../../../PartnerOptions/constants'

export default function () {
  const initialState = {
    loader: false,
    error: null,
    license: {},
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case READINESS_LICENSE_INFO_SET.INITIATE:
      case COMPANY_FILTER_CHANGE:
        return { ...state, loader: true }
      case READINESS_LICENSE_INFO_SET.SUCCESS:
        return {
          ...state,
          error: null,
          expiery: action.payload.data?.expiery,
          license: { ...action.payload.data?.license },
          loader: false,
        }
      case READINESS_LICENSE_INFO_SET.ERROR:
        return { ...state, error: action.error }
      case READINESS_LICENSE_INFO_SET.CANCEL:
        return { ...state, loader: false }
      default:
        return state
    }
  }
}
