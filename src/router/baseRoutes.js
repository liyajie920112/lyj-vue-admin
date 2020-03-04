import Layout from '../layout/index.vue'

const routes = [{
  path: '/',
  name: 'Layout',
  redirect: '/dashboard',
  component: Layout,
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      title: '首页',
      noClose: true
    }
  }]
},
{
  path: '/question',
  name: 'Layout',
  redirect: '/question/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Question',
    component: () => import(/* webpackChunkName: "question" */ '../views/question/index.vue'),
    meta: {
      title: '题库管理'
    }
  }]
},
{
  path: '/exam',
  name: 'Layout',
  redirect: '/exam/index',
  component: Layout,
  meta: {
    title: '考试管理'
  },
  children: [{
    path: 'index',
    name: 'Exam',
    component: () => import(/* webpackChunkName: "exam" */ '../views/exam/index.vue'),
    meta: {
      title: '考试管理'
    }
  }, {
    path: 'question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "question" */ '../views/question/index.vue'),
    meta: {
      title: '题库管理'
    }
  }]
},
{
  path: '/login',
  name: 'Login',
  hidden: true,
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
},
{
  path: '/profile',
  component: Layout,
  hidden: true,
  children: [{
    path: 'index',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/index.vue'),
    meta: {
      title: '个人中心'
    }
  }]
}]

export default routes
