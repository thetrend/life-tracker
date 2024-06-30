import { useState } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import { ZodError } from 'zod'
import userSchema from '../schemas/user'

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
      <div className="form-control">
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          readOnly
          disabled
          aria-labelledby="email-label"
          className="input input-bordered w-full"
        />
        <span id="email-label" className="sr-only">
          Email
        </span>
      </div>

      <div className="form-control">
        <input
          id="display"
          type="text"
          name="display"
          value={formData.display}
          onChange={handleChange}
          aria-labelledby="display-label"
          className="input input-bordered w-full"
          placeholder="Display Name"
          required
        />
        <span id="display-label" className="sr-only">
          Display Name
        </span>
        {errors.display && (
          <p className="text-error text-sm mt-1">{errors.display}</p>
        )}
      </div>

      <div className="form-control">
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          aria-labelledby="password-label"
          className="input input-bordered w-full"
          placeholder="Password"
          required
        />
        <span id="password-label" className="sr-only">
          Password
        </span>
        {errors.password && (
          <p className="text-error text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div className="form-control">
        <input
          id="verifiedPassword"
          type="password"
          name="verifiedPassword"
          value={formData.verifiedPassword}
          onChange={handleChange}
          aria-labelledby="verifiedPassword-label"
          className="input input-bordered w-full"
          placeholder="Verify Password"
          required
        />
        <span id="verifiedPassword-label" className="sr-only">
          Verify Password
        </span>
        {errors.verifiedPassword && (
          <p className="text-error text-sm mt-1">{errors.verifiedPassword}</p>
        )}
      </div>

      <div className="form-control">
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          aria-labelledby="username-label"
          className="input input-bordered w-full"
          placeholder="Username"
          required
        />
        <span id="username-label" className="sr-only">
          Username
        </span>
        {errors.username && (
          <p className="text-error text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div className="form-control">
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          aria-labelledby="birthday-label"
          className="input input-bordered w-full"
          placeholder="Birthday"
          required
        />
        <span id="birthday-label" className="sr-only">
          Birthday
        </span>
        {errors.birthday && (
          <p className="text-error text-sm mt-1">{errors.birthday}</p>
        )}
      </div>

      <div className="form-control">
        <input
          id="timezone"
          name="timezone"
          type="text"
          value={formData.timezone}
          readOnly
          disabled
          aria-labelledby="timezone-label"
          className="input input-bordered w-full"
        />
        <span id="timezone-label" className="sr-only">
          Timezone
        </span>
      </div>

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
