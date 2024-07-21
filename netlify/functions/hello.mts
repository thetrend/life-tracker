import { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    // Initialize the client
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Connected',
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error: ${error}`,
      }),
    }
  }
}

export { handler }
