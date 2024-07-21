import { string, object } from 'zod'

const loginSchema = object({
  email: string().email({ message: 'Invalid email address' }),
})

export default loginSchema
