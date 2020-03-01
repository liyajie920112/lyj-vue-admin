import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './baseRoutes'
import { getToken } from '@/utils/token'
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const commonPath = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断是否有角色
      const userinfo = store.getters['user/userInfo']
      if (userinfo.roles && userinfo.roles.length > 0) {
        next()
      } else {
        // 获取用户信息
        await store.dispatch('user/getUserInfo')
        next()
      }
    }
  } else {
    if (commonPath.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
