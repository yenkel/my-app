import { ITEMS_ADD } from './constants'

export const addItems = items => ({ type: ITEMS_ADD, payload: { items } })
