export const promissionConfig = {
  classNamePre: 'promission',
  searchModels: [{
    prop: 'permissionName',
    value: '',
    label: '权限名称',
    placeholder: '请输入权限名称',
    type: 'text'
  }],
  editModel: {
    permissionName: '',
    url: ''
  },
  editModelRules: [{
    permissionName: {
      required: true,
      message: '请输入权限名称',
      trigger: 'blur'
    },
    url: {
      required: true,
      message: '请输入权限地址',
      trigger: 'blur'
    }
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
