import { combineEpics } from 'redux-observable'

import licensesEpics from './Licenses/epics'

export default combineEpics(
  licensesEpics,
)
