export interface authResponse {
  access_token: string
  token_type: string
}

export class AuthService {
  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async login(username: string, password: string): Promise<authResponse> {
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
    return await response.json()
  }

  async logout(): Promise<void> {
    // Lógica de logout, se necessário, na API
  }

  async fetchProtectedResource() {
    const token = localStorage.getItem('access_token')
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
    const token = localStorage.getItem('access_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}
