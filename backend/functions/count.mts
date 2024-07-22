import supertokens, { getUserCount } from 'supertokens-node'
import { Handler } from '@netlify/functions'
import getBackendConfig from '../config/supertokensConfig'

supertokens.init(getBackendConfig())

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }
  try {
    const count = await getUserCount()
    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
