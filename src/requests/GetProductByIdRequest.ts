import Request from '@/requests/Request'
import Joi from 'joi'
class GetProductByIdRequest extends Request {
      id:number = 0;
      protected readonly schema = Joi.object().keys({
        id: Joi.number()
          .required(),
      }).options({
        abortEarly:false
      })
  }
export default GetProductByIdRequest
