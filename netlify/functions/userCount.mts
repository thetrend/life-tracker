import { Handler } from '@netlify/functions'
import faunadb from 'faunadb'
import client from '../../src/lib/fauna'

const { query: q } = faunadb

const handler: Handler = async (event) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unknown error occurred' }),
    }
  }
}

export { handler }
