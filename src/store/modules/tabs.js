const state = {
  views: [],
  cacheViews: [] // 以字符串格式存储需要缓存的组件, 存放的是需要缓存的组件名称
}

const mutations = {
  ADD_VIEWS(state, route) {
    // 判断路由是否已经存在打开的views中
    const has = state.views.some(a => a.path === route.path)
    if (has) return
    // 没有则添加
    state.views.push({
      ...route,
      title: route.meta.title || '未设置'
    })
  },
  ADD_CACHE_VIEWS(state, route) {
    // 设置需要缓存的视图
    if (state.cacheViews.includes(route.name)) return
    if (!route.meta.noCache) {
      state.cacheViews.push(route.name)
    }
  },
  REMOVE_VIEW(state, route) {
    const index = state.views.findIndex(a => a.path === route.path)
    if (index > -1) {
      state.views.splice(index, 1)
    }
  },
  REMOVE_CACHE_VIEW(state, route) {
    const index = state.cacheViews.indexOf(route.name)
    if (index > -1) {
      state.cacheViews.splice(index, 1)
    }
  }
}

const getters = {
  getTabs(state) {
    return state.views
  }
}

const actions = {
  addViews({ dispatch }, route) {
    dispatch('addShowViews', route)
    dispatch('addCacheViews', route)
  },
  addShowViews({ commit }, route) {
    commit('ADD_VIEWS', route)
  },
  addCacheViews({ commit }, route) {
    commit('ADD_CACHE_VIEWS', route)
  },
  removeView({ dispatch, state }, route) {
    return new Promise((resolve) => {
      dispatch('removeShowView', route)
      dispatch('removeCacheView', route)
      resolve({
        views: [...state.views]
      })
    })
  },
  removeShowView({ commit }, route) {
    commit('REMOVE_VIEW', route)
  },
  removeCacheView({ commit }, route) {
    commit('REMOVE_CACHE_VIEW', route)
  }
}

const tabsModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default tabsModule
