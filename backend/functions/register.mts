import { Handler } from '@netlify/functions'
import { ZodError } from 'zod'
import { DateTime } from 'luxon'
import { fql, FaunaError } from 'fauna'
import faunaClient from '../config/faunaConfig'
import registerSchema from '../../src/schemas/registerSchema'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    }
  }

  try {
    const {
      email,
      display,
      password,
      verifiedPassword,
      username,
      birthday,
      timezone,
    } = JSON.parse(event.body || '{}')

    // Validate data with Zod
    registerSchema.parse({
      email,
      display,
      password,
      verifiedPassword,
      username,
      birthday,
      timezone,
    })

    // Parse and format birthday using Luxon
    const formattedBirthday = DateTime.fromISO(birthday).toISODate()

    // create new user in Fauna
    const newUser = fql`
      User.create({
        email,
        username,
        display,
        birthday: ${formattedBirthday},
        timezone,
      })
    `

    const response = await faunaClient.query(newUser)

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User created successfully',
        user: response.data,
      }),
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors
      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      }
    }
    if (error instanceof FaunaError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: error.message }),
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
