export class AuthRepository {
  private static TOKEN_KEY = 'access_token'

  saveToken(token: string): void {
    localStorage.setItem(AuthRepository.TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(AuthRepository.TOKEN_KEY)
  }

  clearToken(): void {
    localStorage.removeItem(AuthRepository.TOKEN_KEY)
  }
}
