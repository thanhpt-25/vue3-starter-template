import type { Request }  from '@/requests/RequestInterface'
import Joi from 'joi'
class GetAllProductRequest implements Request {
  private readonly schema = Joi.object().keys({
  }).options({
    abortEarly:false
  })
  private readonly data: Partial<GetAllProductRequest>= {};

  constructor(partial:Partial<GetAllProductRequest>) {
    Object.assign(this.data, partial)
  }
  public validated(): any {
      const result = this.schema.validate(this.data)
      if(result.error){
        const errorMessage = result.error.details.map((detail)=>detail.message).join();
        throw Error(errorMessage);
      }
      return this.data
  }
}
export default GetAllProductRequest
