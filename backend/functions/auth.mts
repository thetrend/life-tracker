import supertokens from 'supertokens-node'
import { middleware } from 'supertokens-node/framework/awsLambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import type { HandlerEvent } from '@netlify/functions'
import getBackendConfig from '../config/supertokensConfig'

try {
  supertokens.init(getBackendConfig())
  // eslint-disable-next-line no-console
  console.log('Supertokens initialized successfully.')
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error initializing Supertokens:', error)
}

const handler = middy(
  middleware(async (event: HandlerEvent) => {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        body: '',
      }
    }

    return {
      statusCode: 404,
      body: '',
    }
  })
).use(
  cors({
    origin: getBackendConfig().appInfo.websiteDomain,
    credentials: true,
    headers: ['Content-Type', ...supertokens.getAllCORSHeaders()].join(', '),
    methods: 'OPTIONS,POST,GET,PUT,DELETE',
  })
)

// eslint-disable-next-line import/prefer-default-export
export { handler }
