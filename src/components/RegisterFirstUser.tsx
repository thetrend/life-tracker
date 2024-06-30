import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import RegisterUser from './RegisterUser'
import ShowRegisterForm from './ShowRegisterForm'

interface CheckEmailResponse {
  match: boolean
}

interface ErrorResponse {
  error: string
}

function RegisterFirstUser() {
  const [email, setEmail] = useState<string>('')
  const [match, setMatch] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCheckEmail = async () => {
    setLoading(true) // Start loading
    setError(null) // Clear previous errors

    try {
      const response = await axios.post<CheckEmailResponse>('/api/checkEmail', {
        email,
      })
      setMatch(response.data.match)
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
    content = <p>Error: {error}</p>
  } else if (match === null) {
    content = (
      <div className="relative">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full pr-16"
          placeholder="Email"
        />
        <button
          onClick={handleCheckEmail}
          className="absolute inset-y-0 right-0 flex items-center px-4"
          disabled={loading}
          aria-label="Check Email"
          type="button"
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
    )
  } else if (match) {
    content = <ShowRegisterForm email={email} />
  } else {
    content = <RegisterUser />
  }

  return <div>{content}</div>
}

export default RegisterFirstUser
