import Request from '@/requests/Request'
import Joi from 'joi'
class LoginRequest extends Request {
  username: string = ''
  password: string = ''
  protected readonly schema = Joi.object()
    .keys({
      username: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required().min(8)
    })
    .options({
      abortEarly: false
    })
}
export default LoginRequest
