import { defineStore } from 'pinia';
export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {}
  }),
  actions: {
    async getAll() {
      this.users = { loading: true };
      //fetchWrapper.get(baseUrl)
      //  .then(users => this.users = users)
      //  .catch(error => this.users = { error })
    }
  }
});