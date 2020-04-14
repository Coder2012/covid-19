import { domain } from './domain'

export const incrementLoading = domain.event('incrementLoading')
export const decrementLoading = domain.event('decrementLoading')

export const loading = domain.store(0, {name: 'loading'})
  .on(incrementLoading, val => val + 1)
  .on(decrementLoading, val => val - 1)
