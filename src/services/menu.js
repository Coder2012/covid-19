import { createEvent, createStore } from 'effector-logger'

export const setCategory = createEvent()
export const category = createStore('deaths').on(setCategory, (state, id) => id)


