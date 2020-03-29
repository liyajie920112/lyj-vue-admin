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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="rolevalue" label="角色值" width="180"></el-table-column>
        <el-table-column prop="roledesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editPromission(scope.row)">配置权限</el-button>
            <el-button size="mini" type="text" @click="editRole(scope.row)">修改</el-button>
            <el-button size="mini" type="text" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </content-wrapper>
    <el-dialog @closed="dialogClosed" :title="title" :visible.sync="dialogRoleVisible">
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
    <el-dialog title="配置权限" @opened="dialogOpened" :visible.sync="dialogVisible">
      <el-tree node-key="id" ref="promissionTree" :props="props" :data="promissionData" show-checkbox></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdatePromise">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createRole, getRoles, deleteRoleById, updateRolePromission } from '@/api/role'
import FormWrapper from '@/components/form-wrapper'
import ContentWrapper from '@/components/content-wrapper'
import { getPromissions } from '../../api/promission'
export default {
  components: {
    FormWrapper,
    ContentWrapper
  },
  data() {
    return {
      dialogRoleVisible: false,
      dialogVisible: false,
      formLabelWidth: '80px',
      props: {
        label: 'promissionName',
        children: 'children'
      },
      promissionData: [],
      curRole: {},
      formRole: {
        rolename: ''
      },
      formRoleAdd: {
        formRoleAddRules: {
          rolename: {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          rolevalue: {
            required: true,
            message: '请输入角色值',
            trigger: 'blur'
          }
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
  computed: {
    title() {
      return this.formRoleAdd.model.id ? '修改角色' : '添加角色'
    }
  },
  methods: {
    search() {},
    editPromission(role) {
      this.curRole = role
      // 配置权限
      this.dialogVisible = true
    },
    editRole(role) {
      for (const key in this.formRoleAdd.model) {
        this.formRoleAdd.model[key] = role[key]
      }
      this.formRoleAdd.model.id = role.id
      this.dialogRoleVisible = true
    },
    deleteRole(id) {
      this.$confirm('你确定要删除改角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 发送请求
          deleteRoleById({ id }).then(r => {
            this.$message.success(r.msg || '删除成功')
            this.getRoleList()
          })
        })
        .catch(e => {
          console.log('已取消')
        })
    },
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
      this.formRoleAdd.model = {
        id: '',
        rolename: '',
        rolevalue: '',
        roledesc: ''
      }
    },
    async dialogOpened() {
      // 请求权限列表
      const r = await getPromissions()
      this.promissionData = r.data
      // 设置选中的key
      const keys = []
      const pvs = this.curRole.rolePromissions.split(',')
      r.data.forEach(item => {
        if (pvs[item.promissionPos] && (parseInt(pvs[item.promissionPos]) & parseInt(item.promissionValue))) {
          keys.push(item.id)
        }
      })
      console.log('keys', keys)
      this.$refs.promissionTree.setCheckedKeys(keys)
      console.log('this.currole', this.curRole)
      console.log('r', r)
    },
    async saveOrUpdatePromise() {
      // 获取选中的节点
      const nodes = this.$refs.promissionTree.getCheckedNodes()
      const pvs = []
      nodes.forEach(item => {
        if (pvs.length === 0) {
          pvs.push(item.promissionValue)
        } else {
          pvs[item.promissionPos] = pvs[item.promissionPos] | item.promissionValue
        }
      })
      // 更新角色id
      const r = await updateRolePromission({
        id: this.curRole.id,
        rolePromissions: pvs.join(',')
      })
      this.getRoleList()
      console.log('r', r)
      this.dialogVisible = false
      this.$message.success(r.msg)
    }
  }
}
</script>

<style>
</style>
