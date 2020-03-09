import http from '../utils/request'

/**
 * 添加角色
 * @param {参数} params
 */
export const createRole = (params) => {
  return http({
    url: '/role/create',
    method: 'post',
    data: params
  })
}

/**
 * 获取角色列表
 * @param {参数} params
 */
export const getRoles = (params) => {
  return http({
    url: '/role/list',
    method: 'get',
    params
  })
}

/**
 * 获取角色列表
 * @param {参数} params
 */
export const deleteRoleById = (params) => {
  return http({
    url: '/role/delete',
    method: 'post',
    data: params
  })
}
