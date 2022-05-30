import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayTokenAuthorizerEvent,
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayAuthorizerResult,
  APIGatewayEventRequestContext,
  SNSEvent,
} from 'aws-lambda'

export {PolicyDocument} from 'aws-lambda'

type Payload = Record<string, unknown>
type Maybe<Data extends unknown> = Data | undefined

type Request<
  TBody extends Payload = Payload,
  TPathParameters extends Payload = Payload,
  TQueryStringParameters extends Payload = Payload
> = APIGatewayProxyEvent & {
  body: TBody
  pathParameters: TPathParameters
  queryStringParameters: TQueryStringParameters
}

export type Response = APIGatewayProxyResult

export type APIGatewayHandler<
  TBody extends Payload = Payload,
  TPathParameters extends Payload = Payload,
  TQueryStringParameters extends Payload = Payload
> = (
  req: Request<TBody, TPathParameters, TQueryStringParameters>,
  ctx: APIGatewayEventRequestContext
) => Promise<Response>

export type Result<TData extends unknown> = [Error] | [undefined, TData]

export type JWT = {
  payload: string
}

export type AuthorizerEvent = APIGatewayTokenAuthorizerEvent
export type AuthorizerContext = APIGatewayEventDefaultAuthorizerContext
export type AuthorizerHandler = (
  event: AuthorizerEvent,
  context: AuthorizerContext
) => Promise<APIGatewayAuthorizerResult>

export type SNSHandler = (event: SNSEvent) => Promise<void>
