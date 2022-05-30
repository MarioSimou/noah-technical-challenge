import {newHandler, newResponse, StatusBadRequest, StatusOK} from '@libs/gateway'
import {APIGatewayHandler} from '@libs/types'
import * as Joi from 'joi'

type ParamsSchema = {
  customerID: string
}

const paramsValidationSchema = Joi.object<ParamsSchema>({
  customerID: Joi.string().required().uuid(),
})

const getCustomerRewards: APIGatewayHandler<never, ParamsSchema> = async req => {
  const {error: paramsValidationError, value: params} = paramsValidationSchema.validate(req.pathParameters)

  if (paramsValidationError) {
    return newResponse(StatusBadRequest, paramsValidationError)
  }
  const {customerID} = params

  // TODO: implement business logic to retrieve reward of that particular user
  return newResponse(StatusOK, {
    rewards: `list of rewards of customer '${customerID}'`,
  })
}

export const getCustomerRewardsHandler = newHandler(getCustomerRewards)
