import { combineReducers } from 'redux'

import dashboardMenuReducer from './Menu/reducer'

import licensesReducer from './Home/Licenses/reducer'

export default function () {
  const initialState = combineReducers({
    menu: dashboardMenuReducer(),
    home: combineReducers({
      licenses: licensesReducer(),
    }),
  })

  return (state = initialState, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
}
