<template>
  <div class="role-wrapper">
    <form-wrapper>
      <el-form :inline="true" :model="formRole" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formRole.rolename" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" circle @click="search"></el-button>
        </el-form-item>
      </el-form>
    </form-wrapper>
    <content-wrapper>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="name" label="角色值" width="180"></el-table-column>
        <el-table-column prop="address" label="角色描述"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
    </content-wrapper>
  </div>
</template>

<script>
import FormWrapper from '@/components/form-wrapper'
import ContentWrapper from '@/components/content-wrapper'
export default {
  components: {
    FormWrapper,
    ContentWrapper
  },
  data() {
    return {
      formRole: {
        rolename: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    search() {}
  }
}
</script>

<style>
</style>
