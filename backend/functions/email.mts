import supertokens from 'supertokens-node'
import { fql } from 'fauna'
import { Handler } from '@netlify/functions'
import getBackendConfig from '../config/supertokensConfig'
import faunaClient from '../config/faunaConfig'

supertokens.init(getBackendConfig())

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  const isRegistered = async (email: string): Promise<boolean> => {
    try {
      const query = fql`
        User.byEmail(${email}).count()
      `
      const response = await faunaClient.query(query)
      return response.data !== 0
    } catch (error) {
      return false
    }
  }

  try {
    const INVITED_EMAILS = process.env.INVITED_EMAILS as string
    const emailsArray = INVITED_EMAILS.split(',')

    const { email } = JSON.parse(event.body || '{}')
    const match = emailsArray.includes(email)
    const registered = await isRegistered(email)
    return {
      statusCode: 200,
      body: JSON.stringify({ match, registered }),
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
