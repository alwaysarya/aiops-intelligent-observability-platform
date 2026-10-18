export const authService = {
  login: async (username, password) => {
    try {
      // FastAPI OAuth2 expects form data
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response = await fetch('http://localhost:8080/api/ingestion/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      })

      if (!response.ok) {
        const err = await response.json()
        return { success: false, error: err.detail || 'Login failed' }
      }

      const data = await response.json()
      sessionStorage.setItem('aiops_token', data.access_token)
      localStorage.setItem('aiops_user', JSON.stringify({ name: username, role: 'admin' }))
      return { success: true, token: data.access_token }
    } catch (e) {
      return { success: false, error: 'Backend unavailable. Start API Gateway.' }
    }
  },

  logout: () => {
    sessionStorage.removeItem('aiops_token')
    localStorage.removeItem('aiops_user')
    window.location.href = '/login'
  },

  isAuthenticated: () => !!sessionStorage.getItem('aiops_token'),

  getUser: () => {
    const user = localStorage.getItem('aiops_user')
    return user ? JSON.parse(user) : null
  },

  getToken: () => sessionStorage.getItem('aiops_token')
}
