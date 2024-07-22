import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { RegisterFirstUser } from '../../components'

interface UserCountResponse {
  count: number
}

interface ErrorResponse {
  error: string
}

// Type guard to check if the error is an AxiosError
function isAxiosError(err: unknown): err is AxiosError {
  return axios.isAxiosError(err)
}

function Register() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserCount = async () => {
      setLoading(true) // Start loading
      setError(null) // Clear any previous errors

      try {
        // Replace with your actual endpoint URL
        const response = await axios.get<UserCountResponse>('/api/count')

        // Set the count from the response data
        setCount(response.data.count)
      } catch (err: unknown) {
        // Handle errors and set error state
        if (isAxiosError(err)) {
          if (err.response) {
            // Server responded with a status other than 2xx
            const errorResponse = err.response.data as ErrorResponse
            setError(errorResponse.error)
          } else if (err.request) {
            // Request was made but no response received
            setError('No response from server.')
          }
        } else {
          // Something happened in setting up the request or a different kind of error
          setError('Error setting up request.')
        }
      } finally {
        setLoading(false) // End loading
      }
    }

    fetchUserCount()
  }, []) // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {count !== null &&
        !loading &&
        (count === 0 ? (
          <RegisterFirstUser />
        ) : (
          'Request an invitation to register.'
        ))}
    </div>
  )
}

export default Register
