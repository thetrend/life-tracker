import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import { SessionEvent } from 'supertokens-node/framework/awsLambda'
import { verifySession } from 'supertokens-node/recipe/session/framework/awsLambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import getBackendConfig from '../config/supertokensConfig'

supertokens.init(getBackendConfig())

const handler = async (event: SessionEvent) => {
  const session = await Session.getSession(event, event)
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    }),
  }
}

export default middy(verifySession(handler)).use(
  cors({
    origin: getBackendConfig().appInfo.websiteDomain,
    credentials: true,
    headers: ['Content-Type', ...supertokens.getAllCORSHeaders()].join(', '),
    methods: 'OPTIONS,POST,GET,PUT,DELETE',
  })
)
