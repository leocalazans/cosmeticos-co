import { AuthService } from './AuthService'

export class AuthUseCase {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  async executeLogin(username: string, password: string): Promise<string> {
    const { token } = await this.authService.login(username, password)
    return token
  }

  executeLogout(): void {
    this.authService.logout()
  }
}
