// import { Handler } from '@netlify/functions'
// import jwt from 'jsonwebtoken'

// const handler: Handler = async (event) => {
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: 'Method not allowed' }),
//     }
//   }

//   try {
//     const { refreshToken } = JSON.parse(event.body || '{}')

//     if (!refreshToken) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({
//           message: 'Refresh token is required',
//         }),
//       }
//     }

//     // Verify refresh token
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_SECRET as string
//     ) as jwt.JwtPayload
//     const newToken = jwt.sign(
//       {
//         email: decoded.email,
//         userId: decoded.userId,
//       },
//       process.env.JWT_SECRET as string,
//       {
//         expiresIn: '15m',
//       }
//     )

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         token: newToken,
//       }),
//     }
//   } catch (error) {
//     return {
//       statusCode: 401,
//       body: JSON.stringify({
//         message: 'Invalid or expired refresh token',
//       }),
//     }
//   }
// }

// export { handler }
