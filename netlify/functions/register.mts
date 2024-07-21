// import { Handler } from '@netlify/functions'
// import omit from 'lodash/omit.js'
// import { ZodError } from 'zod'
// import { DateTime } from 'luxon'
// import bcrypt from 'bcryptjs'
// import { Client, Query as q, FaunaError } from 'fauna'
// import registerSchema from '../../src/schemas/registerSchema'

// const client = new Client({
//   secret: process.env.FAUNA_SECRET,
// })

// const handler: Handler = async (event) => {
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: 'Method not allowed' }),
//     }
//   }

//   try {
//     const {
//       email,
//       display,
//       password,
//       verifiedPassword,
//       username,
//       birthday,
//       timezone,
//     } = JSON.parse(event.body || '{}')

//     // Validate data with Zod
//     registerSchema.parse({
//       email,
//       display,
//       password,
//       verifiedPassword,
//       username,
//       birthday,
//       timezone,
//     })

//     // bcrypt salt rounds
//     const saltRounds = 10

//     // Hash password using bcrypt
//     const hashPassword = async (password: string) => {
//       try {
//         const hash = await bcrypt.hash(password, saltRounds)
//         return hash
//       } catch (error) {
//         console.error('Error hashing password: ', error)
//       }
//     }

//     // Parse and format birthday using Luxon
//     const formattedBirthday = DateTime.fromISO(birthday).toISODate()

//     // Create user in FaunaDB
//     const newUser = await client.query(
//       q.Create(q.Collection('users'), {
//         data: {
//           email,
//           username,
//           display,
//           password: await hashPassword(password),
//           birthday: formattedBirthday,
//           timezone,
//         },
//       })
//     )

//     // Remove the password from the returned user object
//     const sanitizedUser = omit(newUser, ['data.password'])

//     return {
//       statusCode: 201,
//       body: JSON.stringify({
//         message: 'User created successfully',
//         user: sanitizedUser,
//       }),
//     }
//   } catch (error: unknown) {
//     if (error instanceof ZodError) {
//       const errors = error.flatten().fieldErrors

//       return {
//         statusCode: 400,
//         body: JSON.stringify({ errors }),
//       }
//     }

//     if (error instanceof Error) {
//       // Handle FaunaDB unique constraint error
//       const faunaError = error as FaunaDBErrorResponse
//       if (
//         faunaError.requestResult?.statusCode === 400 &&
//         faunaError.requestResult?.responseRaw.includes('instance not unique')
//       ) {
//         return {
//           statusCode: 409, // Conflict status code
//           body: JSON.stringify({ message: 'User already exists' }),
//         }
//       }

//       if (error.message.includes('undefined index')) {
//         return {
//           statusCode: 500,
//           body: JSON.stringify({ message: 'FaunaDB index not found' }),
//         }
//       }

//       return {
//         statusCode: 500,
//         body: JSON.stringify({ message: 'Internal server error' }),
//       }
//     }

//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Internal server error' }),
//     }
//   }
// }

// export { handler }
