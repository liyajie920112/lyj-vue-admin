<template>
  <div class="profile-wrapper">
    <div class="profile-form">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item class="profile-avatar" label="头像">
          <el-avatar icon="el-icon-user-solid" shape="circle" class="avatar" :key="userInfo.avatar" @click.native="selectAvatar" :size="80" :src="userInfo.avatar"/>
          <input style="display: none" type="file" name="avatar" @change="uploadAvatar" ref="avatarFile" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="modify">修改</el-button>
          <el-button type="warning" @click="dialogFormVisible = true">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="修改密码" @closed="dialogClosed" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="form-pwd" :model="pwdInfo" :rules="rules">
        <el-form-item label="旧密码" label-width="80px" prop="oldPwd">
          <el-input type="password" v-model="pwdInfo.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newPwd">
          <el-input type="password" v-model="pwdInfo.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="confirmPwd">
          <el-input type="password" v-model="pwdInfo.confirmPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitModifyPwd('form-pwd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserPwd, updateUser, uploadAvatar } from '@/api/user'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Profile',
  created() {
    this.user.name = this.userInfo.name
    this.user.avatar = this.userInfo.avatar
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdInfo.newPwd !== '') {
          this.$refs['form-pwd'].validateField('confirmPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdInfo.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      user: {
        name: '',
        avatar: ''
      },
      pwdInfo: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        confirmPwd: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  methods: {
    ...mapMutations('user', {
      setAvatar: 'SET_AVATAR'
    }),
    modify() {
      updateUser({ nickname: this.user.name }).then(res => {
        this.$message.success(res.msg || '修改成功')
        // 重新查询用户信息
        this.$store.commit('user/SET_NAME', this.user.name)
      })
    },
    submitModifyPwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateUserPwd(this.pwdInfo).then(res => {
            this.$message.success(res.msg || '修改成功')
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    selectAvatar() {
      this.$refs.avatarFile.click()
    },
    uploadAvatar() {
      const fd = new FormData()
      fd.append('avatar', this.$refs.avatarFile.files[0])
      uploadAvatar(fd).then(res => {
        const avatar = res.data.avatar
        if (avatar) {
          this.setAvatar(avatar)
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    dialogClosed() {
      this.resetForm('form-pwd')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
  .profile-form {
    width: 300px;
    .profile-avatar {
      text-align: center;
      .avatar {
        font-size: 38px;
      }
    }
  }
}
</style>
