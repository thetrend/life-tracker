import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  const USER_ZERO = process.env.USER_ZERO as string

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    const { email } = JSON.parse(event.body || '{}')

    const match = email === USER_ZERO

    return {
      statusCode: 200,
      body: JSON.stringify({ match }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' }),
    }
  }
}

export { handler }
