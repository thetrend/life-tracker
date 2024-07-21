import { string, object } from 'zod'

const registerSchema = object({
  email: string().email('Invalid email address'),
  display: string().min(1, 'Display name must be at least 1 character'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must not exceed 24 characters'),
  verifiedPassword: string(),
  username: string().min(2, 'Username is required'),
  birthday: string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: 'Invalid birthdate',
  }),
  timezone: string().min(1, 'Timezone is required'),
}).refine((data) => data.password === data.verifiedPassword, {
  message: 'Passwords do not match',
  path: ['verifiedPassword'],
})

export default registerSchema
