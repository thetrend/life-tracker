// import { Handler } from '@netlify/functions'
// import faunadb from 'faunadb'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import loginSchema from '../../src/schemas/loginSchema'
// import client from '../../src/lib/fauna'

// const { query: q } = faunadb

// const handler: Handler = async (event) => {
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: 'Method not allowed' }),
//     }
//   }

//   try {
//     const { email, password } = JSON.parse(event.body || '{}')

//     // Valid data with Zod
//     loginSchema.parse({ email })

//     // Fetch user from Faunadb
//     const user = (await client.query(
//       q.Get(q.Collection('users').byEmail(email))
//     )) as any // FIXME: remove this any

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.data.password)
//     if (!isPasswordValid) {
//       return {
//         statusCode: 401,
//         body: JSON.stringify({
//           message: 'Invalid credentials',
//         }),
//       }
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { email, userId: user.ref.id },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '15m' }
//     )
//     const refreshToken = jwt.sign(
//       { email, userId: user.ref.id },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '7d' }
//     )

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ token, refreshToken }),
//     }
//   } catch (error: unknown) {
//     console.error('Server error at Login: ', error)
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: 'Internal server error',
//       }),
//     }
//   }
// }

// export { handler }
