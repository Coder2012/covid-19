import { createDomain } from 'effector'
import { attachLogger } from 'effector-logger/attach'

export const domain = createDomain('domain')
if (process.env.NODE_ENV !== 'production') {
  attachLogger(domain)
}
