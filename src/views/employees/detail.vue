<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置el-card -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="userSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人信息" name="second">
            <!-- 内容 -->
            <!-- <user-info /> -->
            <component :is="userComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <!-- 内容 -->
            <!-- <job-info /> -->
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetaileById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: 'UserInfo',
      JobInfo: 'JobInfo',
      activeName: 'first',
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      userInfo: {
        //   专门存放基本信息
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDetaileById()
  },
  methods: {
    async getUserDetaileById() {
      this.userInfo = await getUserDetaileById(this.userId)
    },
    userSave() {
      this.$refs.userForm.validate().then(async() => {
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style>

</style>
