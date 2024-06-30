import { Handler } from '@netlify/functions'
import argon2 from 'argon2'
import faunadb from 'faunadb'
import omit from 'lodash/omit.js'
import { ZodError } from 'zod'
import { DateTime } from 'luxon'
import client from '../../src/lib/fauna'
import userSchema from '../../src/schemas/user'

interface FaunaDBErrorResponse {
  requestResult?: {
    statusCode: number
    responseRaw: string
  }
}

const { query: q } = faunadb

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
    userSchema.parse({
      email,
      display,
      password,
      verifiedPassword,
      username,
      birthday,
      timezone,
    })

    // Hash password using argon2
    const hashedPassword = await argon2.hash(password)

    // Parse and format birthday using Luxon
    const formattedBirthday = DateTime.fromISO(birthday).toISODate()

    // Create user in FaunaDB
    const newUser = await client.query(
      q.Create(q.Collection('users'), {
        data: {
          email,
          username,
          display,
          password: hashedPassword,
          birthday: formattedBirthday,
          timezone,
        },
      })
    )

    // Remove the password from the returned user object
    const sanitizedUser = omit(newUser, ['data.password'])

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User created successfully',
        user: sanitizedUser,
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

    if (error instanceof Error) {
      // Handle FaunaDB unique constraint error
      const faunaError = error as FaunaDBErrorResponse
      if (
        faunaError.requestResult?.statusCode === 400 &&
        faunaError.requestResult?.responseRaw.includes('instance not unique')
      ) {
        return {
          statusCode: 409, // Conflict status code
          body: JSON.stringify({ message: 'User already exists' }),
        }
      }

      if (error.message.includes('undefined index')) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'FaunaDB index not found' }),
        }
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    }
  }
}

export default handler
