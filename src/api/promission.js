import http from '../utils/request'
const apiPre = '/promission'

/**
 * 添加权限
 * @param {参数} params
 */
export const createPromission = (params) => {
  return http({
    url: apiPre + '/create',
    method: 'post',
    data: params
  })
}

/**
 * 获取权限列表
 * @param {参数} params
 */
export const getPromissions = (params) => {
  return http({
    url: apiPre + '/list',
    method: 'get',
    params
  })
}

/**
 * 根据id删除权限
 * @param {参数} params
 */
export const deletePromissionById = (params) => {
  return http({
    url: apiPre + '/delete',
    method: 'post',
    data: params
  })
}
