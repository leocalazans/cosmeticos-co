import { AuthService } from './AuthService'
import type { authResponse } from './AuthService'
export class AuthUseCase {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  async executeLogin(username: string, password: string): Promise<authResponse> {
    const response = await this.authService.login(username, password)
    return response
  }

  executeLogout(): void {
    this.authService.logout()
  }
}
