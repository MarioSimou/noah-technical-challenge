import {newHandler, newResponse, StatusBadRequest, StatusOK} from '@libs/gateway'
import {APIGatewayHandler} from '@libs/types'
import * as Joi from 'joi'

type ParamsSchema = {
  customerID: string
}

type BodySchema = {
  points: number
}

const paramsValidationSchema = Joi.object<ParamsSchema>({
  customerID: Joi.string().required().uuid(),
})

const bodyValidationSchema = Joi.object<BodySchema>({
  points: Joi.number().required().min(1),
})

const postCustomerRewardDeposit: APIGatewayHandler<BodySchema, ParamsSchema> = async req => {
  const {error: paramsValidationError, value: params} = paramsValidationSchema.validate(req.pathParameters)

  if (paramsValidationError) {
    return newResponse(StatusBadRequest, paramsValidationError)
  }

  const {error: bodyValidationError, value: body} = bodyValidationSchema.validate(req.body)

  if (bodyValidationError) {
    return newResponse(StatusBadRequest, bodyValidationError)
  }

  const {customerID} = params
  const {points} = body

  // TODO: implement business logic to reward a customer X points

  return newResponse(StatusOK, {
    reward: `reward customer '${customerID}' the amount of ${points} points`,
  })
}

export const postCustomerRewardHandler = newHandler(postCustomerRewardDeposit)
