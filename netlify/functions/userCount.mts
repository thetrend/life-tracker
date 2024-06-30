import { Handler } from '@netlify/functions'
import { query as q } from 'faunadb'
import client from '../../src/lib/fauna'

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    const count = (await client.query(
      q.Count(q.Documents(q.Collection('users')))
    )) as number

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

export { handler }
