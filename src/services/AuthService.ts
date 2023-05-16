import type { AxiosResponse } from "axios";
import AuthRepository from "@/repositories/AuthRepository";
import type {TokenEntity} from "@/entities/TokenEntity";
class AuthService {
  private readonly repository  : AuthRepository
  constructor() {
    this.repository = new AuthRepository();
  }
  async login(username : string, password : string):Promise<TokenEntity> {
    const {data } =  await this.repository.attempt(username, password);
    return data;
  }
}
export default AuthService