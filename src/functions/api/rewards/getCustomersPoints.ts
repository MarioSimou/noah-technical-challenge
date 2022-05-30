import {newHandler, newResponse, StatusBadRequest, StatusOK} from '@libs/gateway'
import {APIGatewayHandler} from '@libs/types'
import * as Joi from 'joi'

type QueryStringParamsSchema = {
  interval: 'weekly' | 'monthly' | 'all'
  limit: number
  offset: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}

const queryStringParamsValidationSchema = Joi.object<QueryStringParamsSchema>({
  interval: Joi.string().valid('weekly', 'monthly', 'all').default('all'),
  limit: Joi.number().min(1).default(10),
  offset: Joi.number().min(0).default(0),
  sortBy: Joi.string().default('createdAt'),
  orderBy: Joi.string().valid('ASC', 'DESC').default('ASC'),
})

const getCustomersPoints: APIGatewayHandler<never, never, QueryStringParamsSchema> = async req => {
  const {error: queryStringParamsValidationError, value: queryStringParams} =
    queryStringParamsValidationSchema.validate(req.queryStringParameters ?? {})

  if (queryStringParamsValidationError) {
    return newResponse(StatusBadRequest, queryStringParamsValidationError)
  }

  // offset, sortBy, orderBy parameters are used to configure the call to the data layer
  const {interval, limit} = queryStringParams

  if (interval === 'monthly') {
    // TODO: implement business logic to retrieve rewards of the last month, group them by customers,
    // calculate total points and then sort them
    return newResponse(StatusOK, {
      rewards: `list of ${limit} users with the highest score for the last month`,
    })
  }

  if (interval === 'weekly') {
    // TODO: implement business logic to retrieve rewards of the last week, group them by customers,
    // calculate total points and then sort them
    return newResponse(StatusOK, {
      rewards: `list of ${limit} users with the highest score for the last week`,
    })
  }

  // TODO: implement business logic to retrieve rewards, group them by customers,
  // calculate total points and then sort them
  return newResponse(StatusOK, {
    rewards: `list of top ${limit} rewards since their registration`,
  })
}

export const getCustomersPointsHandler = newHandler(getCustomersPoints)
