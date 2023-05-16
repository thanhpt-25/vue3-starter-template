import { defineStore } from 'pinia';
import router from '@/router';
import AuthService from "@/services/AuthService";
import type {TokenEntity} from "@/entities/TokenEntity";
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return ({
      // initialize state from local storage to enable user to stay logged in
      access_token: JSON.parse(localStorage.getItem('access_token') as string),
      refresh_token: JSON.parse(localStorage.getItem('refresh_token') as string),
      returnUrl: ""
    });
  },
  actions: {
    async login(username, password) {
      const authService = new AuthService();
      const tokenEntity  = await authService.login(username, password)

      // update pinia state
      this.access_token = tokenEntity.access_token;
      this.refresh_token = tokenEntity.refresh_token;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('access_token', JSON.stringify(tokenEntity.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(tokenEntity.refresh_token));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/');
    },
    logout() {
      this.access_token = null;
      localStorage.removeItem('access_token');

      this.refresh_token = null;
      localStorage.removeItem('refresh_token');
      router.push('/login');
    }
  }
});
