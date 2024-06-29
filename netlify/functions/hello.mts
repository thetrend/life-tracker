import { Handler } from '@netlify/functions'
import client from '~/lib/fauna'

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, World!' }),
  }
}

export { handler }
