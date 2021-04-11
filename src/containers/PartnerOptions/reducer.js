import {
  COMPANY_FILTER_APPLY,
  COMPANY_FILTER_CHANGE,
} from './constants'

const initialState = {
  selectedCompany: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FILTER_APPLY:
    case COMPANY_FILTER_CHANGE:
      return {
        ...state,
        selectedCompany: action.payload.selectedCompany || state.selectedCompany,
      }
    case '@@redux-form/CHANGE': {
      if (action.meta.form === 'CREATE_CAMPAIGN_FORM' && action.meta.field === 'partnerCompany') {
        return {
          ...state,
          selectedCompany: action.payload,
        }
      } else return state
    }
    default:
      return state
  }
}
