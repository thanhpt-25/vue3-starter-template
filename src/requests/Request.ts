import Joi from 'joi'

class Request {
   protected readonly schema = Joi.object().keys({
   }).options({
      abortEarly:false
   })
   protected data = {}
   constructor(partial:Partial<Request>) {
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
export default Request