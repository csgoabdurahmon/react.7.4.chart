import api from '../config/axios.config'

const SESSION_KEY = 'nike-admin-session'
const LOGIN_ENDPOINTS = ['/admin/login', '/auth/login', '/login']

const extractLoginPayload = (response) => {
  const payload = response?.data ?? {}
  const data = payload?.data && typeof payload.data === 'object' ? payload.data : payload

  const token = data?.token || data?.accessToken || payload?.token || payload?.accessToken || null
  const user = data?.user && typeof data.user === 'object' ? data.user : data

  return { token, user }
}

export const loginAdmin = async ({ username, password }) => {
  const normalizedUsername = String(username || '').trim()
  const normalizedPassword = String(password || '')

  if (!normalizedUsername) {
    throw new Error('Username kiriting')
  }

  if (!normalizedPassword) {
    throw new Error('Parol kiriting')
  }

  // Offline fallback: username va password ikkalasi ham 'admin' bo'lsa kirish
  if (normalizedUsername === 'admin' && normalizedPassword === 'admin') {
    const offlineSession = {
      isAuthenticated: true,
      username: 'admin',
      loginTime: new Date().toISOString(),
      token: null,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(offlineSession))
    return offlineSession
  }

  let lastError = null

  for (const endpoint of LOGIN_ENDPOINTS) {
    try {
      const response = await api.post(endpoint, {
        username: normalizedUsername,
        password: normalizedPassword,
      })

      const { token, user } = extractLoginPayload(response)

      const adminSession = {
        isAuthenticated: true,
        username: user?.username || user?.name || user?.email || normalizedUsername,
        loginTime: new Date().toISOString(),
        token,
      }

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(adminSession))
      return adminSession
    } catch (error) {
      lastError = error

      if (error?.response?.status && error.response.status !== 404) {
        const serverMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Login xatoligi'
        throw new Error(serverMessage)
      }
    }
  }

  const fallbackMessage =
    lastError?.response?.data?.message ||
    lastError?.response?.data?.error ||
    'Backend login endpoint topilmadi (/admin/login, /auth/login, /login)'

  throw new Error(fallbackMessage)
}

export const logoutAdmin = () => {
  sessionStorage.removeItem(SESSION_KEY)
}

export const isAdminAuthenticated = () => {
  const sessionData = sessionStorage.getItem(SESSION_KEY)

  if (!sessionData) {
    return false
  }

  try {
    const session = JSON.parse(sessionData)
    return Boolean(session.isAuthenticated)
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return false
  }
}

export const getAdminName = () => {
  const sessionData = sessionStorage.getItem(SESSION_KEY)

  if (!sessionData) {
    return 'ADMIN'
  }

  try {
    const session = JSON.parse(sessionData)
    return session.username || 'ADMIN'
  } catch (error) {
    return 'ADMIN'
  }
}