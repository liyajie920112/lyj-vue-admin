<template>
  <div :class="promissionConfig.classNamePre + '-wrapper'">
    <form-wrapper>
      <el-form :inline="true" :model="searchModel" class="demo-form-inline">
        <el-form-item
          :label="item.label"
          v-for="item in promissionConfig.searchModels"
          :key="item.prop"
        >
          <el-input
            :type="item.type"
            v-model="searchModel[item.prop]"
            :placeholder="item.placeholder"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" circle @click="search"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true"></el-button>
        </el-form-item>
      </el-form>
    </form-wrapper>
    <content-wrapper>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="promissionName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="url" label="权限url" width="180"></el-table-column>
        <el-table-column prop="promissionPos" label="权限位"></el-table-column>
        <el-table-column prop="promissionValue" label="权限码"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editPromission(scope.row.id)">配置权限</el-button>
            <el-button size="mini" type="text" @click="editRole(scope.row)">修改</el-button>
            <el-button size="mini" type="text" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </content-wrapper>
    <el-dialog @closed="dialogClosed" :title="title" :visible.sync="dialogVisible">
      <el-form
        :ref="promissionConfig.formRef"
        :model="promissionConfig.editModel"
        :rules="promissionConfig.editModelRules"
      >
        <el-form-item label="父权限" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="promissionConfig.editModel.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" :label-width="formLabelWidth" prop="promissionName">
          <el-input v-model="promissionConfig.editModel.promissionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限url" :label-width="formLabelWidth" prop="url">
          <el-input v-model="promissionConfig.editModel.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRole(promissionConfig.formRef)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { promissionConfig, searchModelsToModel } from '@/utils/classConfig'
import {
  createPromission,
  deletePromissionById,
  getPromissions
} from '@/api/promission'
import FormWrapper from '@/components/form-wrapper'
import ContentWrapper from '@/components/content-wrapper'
export default {
  components: {
    FormWrapper,
    ContentWrapper
  },
  data() {
    console.log('promissionConfig', promissionConfig)
    return {
      promissionConfig,
      searchModel: searchModelsToModel(promissionConfig.searchModels),
      dialogVisible: false,
      formLabelWidth: '80px',
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
          id: '',
          rolename: '',
          rolevalue: '',
          roledesc: ''
        }
      },
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  computed: {
    title() {
      return this.formRoleAdd.model.id ? '修改角色' : '添加角色'
    }
  },
  methods: {
    search() {},
    editPromission(id) {
      // 配置权限
    },
    editRole(role) {
      for (const key in this.formRoleAdd.model) {
        this.formRoleAdd.model[key] = role[key]
      }
      this.formRoleAdd.model.id = role.id
      this.dialogVisible = true
    },
    deleteRole(id) {
      this.$confirm('你确定要删除改角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 发送请求
          deletePromissionById({ id }).then(r => {
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
          createPromission(this.promissionConfig.editModel).then(res => {
            this.$message.success(res.msg || '创建成功')
            this.dialogVisible = false
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    async getList() {
      const res = await getPromissions({})
      this.tableData = res.data
    },
    dialogClosed() {
      this.resetForm(this.promissionConfig.formRef)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.promissionConfig.editModel = {
        parentId: '',
        promissionName: '',
        url: ''
      }
    }
  }
}
</script>

<style>
</style>
