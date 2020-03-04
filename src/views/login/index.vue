<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <h1 class="login-title">系统登录</h1>
      <el-form ref="form" :rules="userrules" :model="user" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')" :loading="logininfo.logining">{{logininfo.loginText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      logininfo: {
        loginText: '登录',
        logining: false
      },
      user: {
        username: '',
        password: ''
      },
      userrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('user', {
      userLogin: 'login'
    }),
    login(formName) {
      this.setLogining(true)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userLogin(this.user).then(res => {
            // 到这里说明登录成功了
            this.$router.push({ path: '/' })
            this.setLogining(false)
          }).catch(e => {
            this.setLogining(false)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setLogining(v) {
      this.logininfo.logining = v
      this.logininfo.loginText = v ? '正在登录...' : '登录'
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  background-color: #fff;
  .form-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 300px;
    border-radius: 2px;
    padding: 10px 30px;
    box-shadow: 0 0 3px #999;
    .login-title {
      text-align: center;
    }
  }
}
</style>
