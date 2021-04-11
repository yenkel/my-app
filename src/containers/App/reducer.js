import {
  DATA_REQUEST_ASYNC,
  REFETCH_OWNER_STATUS_ASYNC,
} from './constants'

const initialState = {
  dataIsLoaded: false,
  data: {
    permissions: {},
    licenses: {},
    ff: {},
    setupStatus: {},
  },
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST_ASYNC.SUCCESS: {
      return {
        ...state,
        error: null,
        dataIsLoaded: true,
        data: action.payload.data,
      }
    }
    case DATA_REQUEST_ASYNC.ERROR:
      return { ...state, error: action.error }
    case DATA_REQUEST_ASYNC.CANCEL:
      return { ...state, loader: false }
    case REFETCH_OWNER_STATUS_ASYNC.SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
      }
    default:
      return state
  }
}
