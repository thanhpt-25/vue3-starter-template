import type { AxiosResponse } from 'axios'
import AuthRepository from '@/repositories/AuthRepository'
import type { TokenEntity } from '@/entities/TokenEntity'
import type LoginRequest from "@/requests/LoginRequest";
class AuthService {
  private readonly repository: AuthRepository
  constructor() {
    this.repository = new AuthRepository()
  }
  async login(request : LoginRequest): Promise<TokenEntity> {
    const username = request.username
    const password = request.password
    const {data} = await this.repository.attempt(username, password)
    return data
  }
}
export default AuthService
