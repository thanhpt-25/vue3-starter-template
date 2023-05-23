import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.access_token) {
    auth.returnUrl = to.fullPath
    return next('login')
  } else {
    return next()
  }
})

export default router
