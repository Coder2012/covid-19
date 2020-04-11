import { createEvent, createStore } from 'effector'

export const setCategory = createEvent()
export const category = createStore('deaths').on(setCategory, (state, id) => id)


