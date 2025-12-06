// Client-side authentication utilities

export const authStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  },

  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  },
}

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = authStorage.getToken()

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (response.status === 401) {
    authStorage.clearToken()
    window.location.href = "/login"
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "API Error")
  }

  return data
}
