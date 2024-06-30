import { useState } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import { ZodError } from 'zod'
import userSchema from '../schemas/user'
import InputField from './lib/InputField'

interface ShowRegisterFormProps {
  email: string
}

interface FormErrors {
  display?: string
  password?: string
  verifiedPassword?: string
  username?: string
  birthday?: string
}

function ShowRegisterForm({ email }: ShowRegisterFormProps) {
  const [formData, setFormData] = useState({
    email,
    display: '',
    password: '',
    verifiedPassword: '',
    username: '',
    birthday: '',
    timezone: DateTime.local().zoneName,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setErrors({})
    setServerError('')
    setSuccessMessage('')

    try {
      userSchema.parse(formData)
      const response = await axios.post('/api/register', formData)

      if (response.status === 201) {
        setSuccessMessage('User registered successfully!')
      } else {
        setServerError('Unexpected response from server.')
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: FormErrors = {}
        error.errors.forEach((err) => {
          const pathKey = err.path[0] as keyof FormErrors
          if (pathKey) {
            formattedErrors[pathKey] = err.message
          }
        })
        setErrors(formattedErrors)
      } else if (axios.isAxiosError(error) && error.response?.status === 409) {
        setServerError('A user with this email or username already exists.')
      } else {
        setServerError('An unexpected error occurred. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        readOnly
        disabled
        placeholder="Email"
      />
      <InputField
        id="display"
        type="text"
        name="display"
        value={formData.display}
        onChange={handleChange}
        placeholder="Display Name"
        error={errors.display}
      />
      <InputField
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        error={errors.password}
      />
      <InputField
        id="verifiedPassword"
        type="password"
        name="verifiedPassword"
        value={formData.verifiedPassword}
        onChange={handleChange}
        placeholder="Verify Password"
        error={errors.verifiedPassword}
      />
      <InputField
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        error={errors.username}
      />
      <InputField
        id="birthday"
        type="date"
        name="birthday"
        value={formData.birthday}
        onChange={handleChange}
        placeholder="Birthday"
        error={errors.birthday}
      />
      <InputField
        id="timezone"
        type="text"
        name="timezone"
        value={formData.timezone}
        onChange={handleChange}
        readOnly
        disabled
        placeholder="Timezone"
      />

      {serverError && (
        <div className="alert alert-error">
          <div className="flex-1">
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <div className="flex-1">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}

export default ShowRegisterForm
