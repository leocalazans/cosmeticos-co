export class AuthService {
  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      throw new Error('Failed to login')
    }

    const data = await response.json()
    return data // Esperando que o token JWT venha no formato { token: 'jwt_token' }
  }

  async logout(): Promise<void> {
    // Lógica de logout, se necessário, na API
  }

  async fetchProtectedResource() {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${this.apiUrl}/protected-endpoint`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch protected resource')
    }

    return await response.json()
  }

  authHeader = () => {
    const token = localStorage.getItem('authToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}
