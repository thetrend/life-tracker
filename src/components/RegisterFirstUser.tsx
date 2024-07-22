import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import RegisterUser from './RegisterUser'
import ShowRegisterForm from './ShowRegisterForm'

interface CheckEmailResponse {
  match: boolean
  registered: boolean
}

interface ErrorResponse {
  error: string
}

function RegisterFirstUser() {
  const [email, setEmail] = useState<string>('')
  const [match, setMatch] = useState<boolean | null>(null)
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCheckEmail = async () => {
    setLoading(true) // Start loading
    setError(null) // Clear previous errors

    try {
      const response = await axios.post<CheckEmailResponse>('/api/email', {
        email,
      })

      if (!response.data.match) {
        setError('Signup is currently invitation-only. Come back later.')
      }

      setMatch(response.data.match)
      setIsRegistered(response.data.registered)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorResponse = err.response.data as ErrorResponse
        setError(errorResponse.error)
      } else {
        setError('Error making request.')
      }
    } finally {
      setLoading(false) // End loading
    }
  }

  let content
  if (loading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = <p>{error}</p>
  } else if (!match) {
    content = (
      <form className="relative w-[50vw]" onSubmit={handleCheckEmail}>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full pr-16"
          placeholder="Email"
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center px-4"
          disabled={loading}
          aria-label="Check Email"
          type="submit"
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </form>
    )
  } else if (match) {
    if (isRegistered) {
      content = "Looks like you're already registered. Please log in."
    } else {
      content = <ShowRegisterForm email={email} />
    }
  } else {
    content = <RegisterUser />
  }

  return <div>{content}</div>
}

export default RegisterFirstUser
