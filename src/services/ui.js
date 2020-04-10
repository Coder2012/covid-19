import { createEvent, createStore } from 'effector'

export const incrementLoading = createEvent()
export const decrementLoading = createEvent()

export const loading = createStore(0)
  .on(incrementLoading, state => state++)
  .on(decrementLoading, state => state--)
