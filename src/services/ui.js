import { createEvent, createStore } from 'effector-logger'

export const incrementLoading = createEvent()
export const decrementLoading = createEvent()

export const loading = createStore(0)
  .on(incrementLoading, val => val + 1)
  .on(decrementLoading, val => val - 1)
