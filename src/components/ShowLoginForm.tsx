import { useState } from 'react'
import axios from 'axios'
import { ZodError } from 'zod'
import InputField from './lib/InputField'

interface FormErrors {
  email?: string
  password?: string
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      // loginSchema.parse(formData)
      const response = await axios.post('/api/login', formData)

      if (response.status === 200) {
        setSuccessMessage('Login successful!')
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
      } else if (axios.isAxiosError(error) && error.response?.status === 401) {
        setServerError('Invalid email or password.')
      } else {
        setServerError('An unexpected error occurred. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-base-200 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <InputField
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email}
        aria-label="Email address"
      />
      <InputField
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        error={errors.password}
        aria-label="Password"
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
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm
