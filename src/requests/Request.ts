import Joi from 'joi'
import type { ValidationErrorItem } from 'joi'

/**
 * Here we provide both the error message and details error in form of
 * Path => Error for that Path validated by Joi
 * This kind of return supported by VeeValidate
 */
export class RequestValidateException extends Error {
  details: ValidationErrorItem[]
  constructor(error) {
    const errorMessage = error.details.map((detail) => detail.message).join()
    super(errorMessage)
    this.details = error.details.reduce((currentArray, detail) => {
      const key = detail.path[0]
      currentArray[`${key}`] = detail.message
      return currentArray
    }, [])
  }
}
class Request {
  protected readonly schema = Joi.object().keys({}).options({
    abortEarly: false
  })
  protected data = {}
  constructor(partial: Partial<Request>) {
    Object.assign(this.data, partial)
  }
  public validated(): any {
    const result = this.schema.validate(this.data)
    if (result.error) {
      // const errorMessage = result.error.details.map((detail)=>detail.message).join();
      const error = result.error
      throw new RequestValidateException(error)
    }
    return this.data
  }
}
export default Request
