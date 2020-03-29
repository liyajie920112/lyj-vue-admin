import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, removeToken, setToken } from './token'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // withCredentials: true,
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  console.log('config', config)
  // 统一设置token
  const userinfo = store.getters['user/userInfo']
  if (userinfo.token) {
    config.headers.authorization = getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message || res.msg || 'Error',
      type: 'error',
      duration: 3 * 1000
    })
    if (res.code === 401) { // 没有授权, 需要重新登录
      MessageBox.confirm('授权失效, 请重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 重置token
        removeToken()
        store.commit('user/SET_TOKEN', '')
        location.reload()
      })
    }
    return Promise.reject(new Error(res.message || res.msg || 'Error'))
  } else { // 成功的时候
    console.log('res--', res)
    if (res.newToken) { // 如果有新token, 则需要重置token
      store.commit('user/SET_TOKEN', res.newToken)
      setToken(res.newToken)
    }
    return res
  }
}, error => {
  Message({
    message: error || 'Error',
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})

export default service
