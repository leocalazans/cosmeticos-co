// stores/authStore.ts
import { defineStore } from 'pinia'
import { AuthUseCase } from '@/services/auth/AuthUseCase'
import { AuthService } from '@/services/auth/AuthService'
import { AuthRepository } from '@/services/auth/AuthRepository'

// Inicializar as instâncias
const authService = new AuthService(import.meta.env.VITE_API_AUTH_URL)
const authRepository = new AuthRepository()
const authUseCase = new AuthUseCase(authService)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: authRepository.getToken() as string | null,
    userName: '' as string,
    isLoggedIn: !!authRepository.getToken()
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await authUseCase.executeLogin(username, password)
        this.token = response.access_token
        this.userName = username
        this.isLoggedIn = true
        authRepository.saveToken(response.access_token)
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    logout() {
      authUseCase.executeLogout()
      this.token = null
      this.userName = ''
      this.isLoggedIn = false

      authRepository.clearToken()
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
