import { Handler } from '@netlify/functions'
import { query as q } from 'faunadb'
import client from '../../src/lib/fauna'

const handler: Handler = async (event, context) => {
  try {
    const result = await client.query(q.Now())
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello, World!', faunaTime: result }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

export { handler }
