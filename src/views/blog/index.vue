<template>
  <div :class="blogConfig.classNamePre + '-wrapper'">
    {{blogmd}}
    <form-wrapper>
      <el-form :inline="true" :model="searchModel" class="demo-form-inline">
        <el-form-item
          :label="item.label"
          v-for="item in blogConfig.searchModels"
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
          <el-button type="primary" icon="el-icon-plus" circle @click="addBlog"></el-button>
        </el-form-item>
      </el-form>
    </form-wrapper>
    <content-wrapper>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag size="small" type="warning" v-if="scope.row.status === 1">草稿</el-tag>
            <el-tag size="small" type="success" v-if="scope.row.status === 2">已发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </content-wrapper>
  </div>
</template>

<script>
import { blogConfig, searchModelsToModel } from '@/utils/classConfig'
import { getBlogList } from '@/api/blog'
import FormWrapper from '@/components/form-wrapper'
import ContentWrapper from '@/components/content-wrapper'
export default {
  name: 'Blog',
  components: {
    FormWrapper,
    ContentWrapper
  },
  data() {
    return {
      blogConfig,
      searchModel: searchModelsToModel(blogConfig.searchModels),
      formLabelWidth: '80px',
      tableData: [],
      blogmd: ''
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
    addBlog() {
      this.$router.push({ name: 'BlogDetail' })
    },
    edit(blog) {
      this.$router.push({ name: 'BlogDetail', params: { id: blog.id } })
    },
    saveOrUpdateRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    async getList() {
      const res = await getBlogList({})
      this.tableData = res.data.list
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.blogConfig.editModel = {
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
