import http from '../utils/request'

/**
 * 用户登录
 * @param {参数} params
 */
export const login = (params) => {
  return http({
    url: '/login/user',
    method: 'post',
    data: params
  })
}

/**
 * 用户登录
 * @param {参数} params
 */
export const logout = (params) => {
  return http({
    url: '/user/logout',
    method: 'post',
    data: params || {}
  })
}

/**
 * 根据token获取用户信息
 * @param {参数} params
 */
export const getUserInfoByToken = (params) => {
  return http({
    url: '/user/info',
    method: 'get',
    params
  })
}

/**
 * 修改用户密码
 * @param {参数} params
 */
export const updateUserPwd = (params) => {
  return http({
    url: '/user/updatepwd',
    method: 'post',
    data: params
  })
}

/**
 * 修改用户信息
 * @param {参数} params
 */
export const updateUser = (params) => {
  return http({
    url: '/user/update',
    method: 'post',
    data: params
  })
}

/**
 * 上传用户头像
 * @param {参数} params
 */
export const uploadAvatar = (params) => {
  return http({
    url: '/user/uploadavatar',
    method: 'post',
    data: params,
    isUpload: true
  })
}
