import type {Request} from '@/requests/RequestInterface'
import Joi from 'joi'
class GetProductByIdRequest implements Request {
  private readonly schema = Joi.object().keys({
    id: Joi.number()
      .required()
  }).options({
    abortEarly:false
  })
  private readonly data: Partial<GetProductByIdRequest>= {};
  constructor(partial: Partial<GetProductByIdRequest>) {
    Object.assign(this.data, partial)
  }
  public validated(): any {
      const result = this.schema.validate(this.data)
      if(result.error){
        const errorMessage = result.error.details.map((detail)=> detail.message).join();
        throw Error(errorMessage);
      }
      return this.data
    }
  }
export default GetProductByIdRequest
