<template>
  <div class="role-wrapper">
    <form-wrapper>
      <el-form :inline="true" :model="formRole" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formRole.rolename" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" circle @click="search"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle @click="dialogRoleVisible = true"></el-button>
        </el-form-item>
      </el-form>
    </form-wrapper>
    <content-wrapper>
      <el-table :data="tableData" :border="true" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="rolevalue" label="角色值" width="180"></el-table-column>
        <el-table-column prop="roledesc" label="角色描述"></el-table-column>
        <el-table-column prop="roledesc" label="操作"></el-table-column>
      </el-table>
    </content-wrapper>
    <el-dialog @closed="dialogClosed" title="添加角色" :visible.sync="dialogRoleVisible">
      <el-form ref="form-role" :model="formRoleAdd.model" :rules="formRoleAdd.formRoleAddRules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="formRoleAdd.model.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色值" :label-width="formLabelWidth" prop="rolevalue">
          <el-input v-model="formRoleAdd.model.rolevalue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formRoleAdd.model.roledesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRole('form-role')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createRole, getRoles } from '@/api/role'
import FormWrapper from '@/components/form-wrapper'
import ContentWrapper from '@/components/content-wrapper'
export default {
  components: {
    FormWrapper,
    ContentWrapper
  },
  data() {
    return {
      dialogRoleVisible: false,
      formLabelWidth: '80px',
      formRole: {
        rolename: ''
      },
      formRoleAdd: {
        formRoleAddRules: {
          rolename: { required: true, message: '请输入角色名称', trigger: 'blur' },
          rolevalue: { required: true, message: '请输入角色值', trigger: 'blur' }
        },
        model: {
          rolename: '',
          rolevalue: '',
          roledesc: ''
        }
      },
      tableData: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    search() {},
    saveOrUpdateRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createRole(this.formRoleAdd.model).then(res => {
            this.$message.success(res.msg || '创建成功')
            this.dialogRoleVisible = false
            this.getRoleList()
          })
        } else {
          return false
        }
      })
    },
    async getRoleList() {
      const res = await getRoles({})
      this.tableData = res.data
    },
    dialogClosed() {
      this.resetForm('form-role')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>
