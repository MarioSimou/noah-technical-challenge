import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
export * from './http'

export const newHandler = handler => {
  return middy(handler).use(middyJsonBodyParser())
}
