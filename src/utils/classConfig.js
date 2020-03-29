export const promissionConfig = {
  classNamePre: 'promission',
  formRef: 'form-promission',
  searchModels: [{
    prop: 'permissionName',
    value: '',
    label: '权限名称',
    placeholder: '请输入权限名称',
    type: 'text'
  }],
  editModel: {
    parentId: '',
    promissionName: '',
    url: ''
  },
  editModelRules: {
    promissionName: {
      required: true,
      message: '请输入权限名称',
      trigger: 'blur'
    },
    url: {
      required: true,
      message: '请输入权限地址',
      trigger: 'blur'
    }
  }
}
export const blogConfig = {
  classNamePre: 'blog',
  formRef: 'form-blog',
  searchModels: [{
    prop: 'title',
    value: '',
    label: '博客标题',
    placeholder: '请输入博客标题',
    type: 'text'
  }]
}

// 将查询框中models转换成model
export function searchModelsToModel (models) {
  const model = {}
  models.forEach(item => {
    model[item.prop] = item.vaue
  })
  return model
}
