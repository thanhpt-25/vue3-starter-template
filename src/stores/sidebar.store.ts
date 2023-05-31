import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: () => ({
    sidebarVisible: true,
    sidebarUnfoldable: false,
  }),
  getters: {
  },
  actions: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
    updateSidebarVisible(payload) {
      this.sidebarVisible = payload
    },
  }
})
