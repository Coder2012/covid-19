import { createEvent, createStore } from 'effector-logger'

export const incrementLoading = createEvent('incrementLoading')
export const decrementLoading = createEvent('decrementLoading')

export const loading = createStore(0, {name: 'loading'})
  .on(incrementLoading, val => val + 1)
  .on(decrementLoading, val => val - 1)
