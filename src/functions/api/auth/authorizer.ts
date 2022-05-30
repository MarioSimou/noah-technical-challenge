import type {Result, PolicyDocument, AuthorizerHandler, AuthorizerEvent, JWT} from '@libs/types'

type PolicyEffect = 'Allow' | 'Deny'
const getPolicy = (effect: PolicyEffect): PolicyDocument => {
  return {
    Id: '',
    Version: '2012-10-17',
    Statement: [
      {
        Effect: effect,
        Action: ['execute-api:Invoke'],
        Resource: '*',
      },
    ],
  }
}

const ErrAuthorizationTokenNotFound = new Error('error: authorization token not found')
const ErrUnauthorized = new Error('error: authorization failed')

const verifyToken = (event: AuthorizerEvent): Result<JWT> => {
  if (!event.authorizationToken) {
    return [ErrAuthorizationTokenNotFound]
  }
  // TODO: implement business logic to verify token and return JWT payload
  const {authorizationToken} = event
  const [_, token] = authorizationToken.match(/^Bearer (.+)$/)
  if (token !== 'allow') {
    return [ErrUnauthorized]
  }

  const decodedJWTPayload = {
    payload: `decoded payload of '${token}'`,
  }

  return [undefined, decodedJWTPayload]
}

export const authorizerHandler: AuthorizerHandler = async event => {
  const [verificationError] = verifyToken(event)

  if (verificationError) {
    return {
      principalId: event.methodArn,
      policyDocument: getPolicy('Deny'),
    }
  }

  return {
    principalId: event.methodArn,
    policyDocument: getPolicy('Allow'),
  }
}
