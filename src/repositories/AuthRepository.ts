import { BaseRepository } from '@/repositories/BaseRepository'
import type { TokenEntity } from '@/entities/TokenEntity'
import { firstValueFrom, catchError } from 'rxjs'
import type { AxiosResponse, AxiosError } from 'axios'

class AuthRepository extends BaseRepository {
  private static readonly url = 'auth/login'

  attempt(username, password): Promise<AxiosResponse<TokenEntity>> {
    return firstValueFrom(
      this.post(AuthRepository.url, { email: username, password: password }).pipe(
        catchError((error: AxiosError) => {
          throw error
        })
      )
    )
  }
}
export default AuthRepository
