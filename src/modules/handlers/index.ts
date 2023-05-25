import {UnauthorizedException} from "@/exceptions/http";
import {unauthorizedHandler} from "@/modules/handlers/unauthorized.hander";
import type {ComponentPublicInstance} from "vue";
/**
 * Simple handlers modules to handle kinds of Error and Exception
 */
const handlers:Map<string,Handler> = new Map()

export type Handler = {(err: any, instance: ComponentPublicInstance | null, info: string):void }

export function registerHandler(error: string, func: Handler){
  handlers.set(error, func)
}
export function removeHandler(error:string){
  handlers.delete(error)
}
/**
 * Register Handlers
 */
registerHandler(UnauthorizedException.name,unauthorizedHandler)

export const handler:Handler = function(error, instance, info) :void {
  handlers.forEach( (handler, key) => {
    if (error.name === key){
      /**
       * First handler match will be executed and then we stop
       */
      return handler(error,instance,info)
    }
  })
  /**
   * Default handling is logging to console
   */
  console.log(error)
}
