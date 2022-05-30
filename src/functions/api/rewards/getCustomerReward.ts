import {newHandler, newResponse, StatusBadRequest, StatusOK} from '@libs/gateway'
import {APIGatewayHandler} from '@libs/types'
import * as Joi from 'joi'

type ParamsSchema = {
  customerID: string
  rewardID: string
}

const paramsValidationSchema = Joi.object<ParamsSchema>({
  customerID: Joi.string().required().uuid(),
  rewardID: Joi.string().required().uuid(),
})

const getCustomerReward: APIGatewayHandler<never, ParamsSchema> = async req => {
  const {error: paramsValidationError, value: params} = paramsValidationSchema.validate(req.pathParameters)

  if (paramsValidationError) {
    return newResponse(StatusBadRequest, paramsValidationError)
  }
  const {customerID, rewardID} = params
  // TODO: implement business logic to retrieve a record of points of that particular user

  return newResponse(StatusOK, {
    reward: `reward '${rewardID}' of customer '${customerID}'`,
  })
}

export const getCustomerRewardHandler = newHandler(getCustomerReward)
