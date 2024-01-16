// axiosConfig.js
import { BASE_URL } from 'AppSettings'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // For sending the cookie containing token
  withCredentials: true
})

// Add an interceptor to include the authentication token if available
axiosInstance.interceptors.request.use((config) => {
  const authToken = getAuthToken()

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})

const getAuthToken = () => {
  // Extract the token from the HTTP-only cookie
  const cookies = document.cookie.split('; ')
  const authTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('authToken=')
  )

  if (authTokenCookie) {
    return authTokenCookie.split('=')[1]
  }

  return null
}

export default axiosInstance
