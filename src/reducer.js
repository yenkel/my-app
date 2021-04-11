import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './containers/App/reducer'
import partnerOptionsReducer from './containers/PartnerOptions/reducer'

export default function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducer,
    form: formReducer,
    partnerOptions: partnerOptionsReducer,
    ...asyncReducers,
  })
}
