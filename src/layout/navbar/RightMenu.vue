<template>
  <div class="right-menu-wrapper">
    <div class="avatar-wrapper">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            class="avatar"
            src="http://img3.imgtn.bdimg.com/it/u=3770990833,1013306388&fm=26&gp=0.jpg"
          />
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.right-menu-wrapper {
  float: right;
  height: 50px;
  overflow: hidden;
  .avatar-wrapper {
    height: 50px;
    padding: 5px;
    .avatar {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
