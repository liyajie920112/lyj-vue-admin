import http from '../utils/request'

/**
 * 博客列表
 * @param {参数} params
 */
export const getBlogList = (params = {}) => {
  return http({
    url: '/blog/list',
    method: 'get',
    data: params
  })
}

/**
 * 发布博客
 * @param {参数} params
 */
export const postBlog = (params = {}) => {
  return http({
    url: '/blog/save',
    method: 'post',
    data: params
  })
}

/**
 * 获取博客
 * @param {参数} params
 */
export const getBlog = (params = {}) => {
  return http({
    url: '/blog/detail',
    method: 'get',
    params
  })
}
