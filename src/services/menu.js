import { createEvent, createStore } from 'effector-logger'

export const setCategory = createEvent('setCategory')
export const category = createStore('deaths', {name: 'category'}).on(setCategory, (state, id) => id)


