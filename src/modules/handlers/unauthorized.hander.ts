import {UnauthorizedException} from "@/exceptions/http";
import {useAuthStore} from "@/stores/auth.store";

export function unauthorizedHandler(error: UnauthorizedException){
    /**
     * UnAuthorizedException has been catch and handled by Axios but we can further do something here like logout
     */
    const authStore = useAuthStore()
    return authStore.logout()
}