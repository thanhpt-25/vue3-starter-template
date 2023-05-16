import {BaseRepository} from "@/repositories/BaseRepository";
import type { TokenEntity } from "@/entities/TokenEntity";
import {firstValueFrom, catchError} from "rxjs"
import type {AxiosResponse, AxiosError} from "axios"
class AuthRepository extends BaseRepository{
  private static readonly url = "auth/login"
  constructor() {
    super(AuthRepository.url);
  }
  attempt(username, password):Promise<AxiosResponse<TokenEntity>>{
    return firstValueFrom(this.post({email:username,password:password}).pipe(
      catchError((error: AxiosError) => {
        console.log(error.response?.data);
        throw 'An error happened!';
      }),

    ))
  }
}
export default AuthRepository