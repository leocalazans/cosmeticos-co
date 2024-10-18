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
        const token = await authUseCase.executeLogin(username, password)
        this.token = token
        this.userName = username
        this.isLoggedIn = true

        // Salvar o token no repositório (localStorage)
        authRepository.saveToken(token)
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    logout() {
      authUseCase.executeLogout()
      this.token = null
      this.userName = ''
      this.isLoggedIn = false

      // Limpar o token do repositório
      authRepository.clearToken()
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
