import { ITEMS_ADD } from './constants'

export default function () {
  const initialState = {
    loader: false,
    items: {},
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case ITEMS_ADD:
        return { ...state, items: { ...state.items, ...action.payload.items } }
      default:
        return state
    }
  }
}
