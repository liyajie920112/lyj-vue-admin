import { login, getUserInfoByToken, logout } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  GET_TOKEN(state) {
    return state.token
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_INTRO(state, intro) {
    state.introduction = intro
  }
}

const getters = {
  userInfo(state) {
    return state
  }
}

const actions = {
  login({ commit, dispatch }, userinfo) {
    const { username, password } = userinfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(async res => {
        const { token } = res.data
        // 设置token
        commit('SET_TOKEN', token)
        setToken(token)
        await dispatch('getUserInfo')
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfoByToken({ token: getToken() }).then(res => {
        console.log('res', res)
        const { roles, name, avatar, introduction } = res.data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        commit('SET_INTRO', introduction)
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

const userModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default userModule
