import { combineEpics } from 'redux-observable'

import homeEpics from './Home/epics'

export default combineEpics(
  homeEpics,
)
