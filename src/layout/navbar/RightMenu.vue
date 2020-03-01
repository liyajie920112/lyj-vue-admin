<template>
  <div class="right-menu-wrapper">
    <div class="avatar-wrapper">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar icon="el-icon-user-solid" class="avatar" :key="userInfo.avatar" :src="userInfo.avatar"></el-avatar>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  methods: {
    ...mapActions('user', {
      logoutAction: 'logout'
    }),
    logout() {
      this.$confirm('您确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.logoutAction()
        this.$router.push('/login')
      })
    }
  }
}
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
