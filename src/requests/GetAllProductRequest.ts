import Request from '@/requests/Request'
import Joi from 'joi'
class GetAllProductRequest extends Request {
  private readonly name: string
  private schema = Joi.object({
    name: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
  })
  private readonly error
  public constructor() {
    super()
    this.error = null
    this.name = GetAllProductRequest.name
  }
  public validated(): any {
    try {
      const result = this.schema.validate({ name: 'Pham Tien Thanh' })
      console.log(result)
      return true
    } catch (e) {
      return false
    }
  }
  public toObject(): Object {
    return {
      name: this.name
    }
  }
  public getErrorDetails() {
    return this.error
  }
}

export default GetAllProductRequest
