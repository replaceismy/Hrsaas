<template>
  <upload-excel :on-success="success">
    <!-- 导入Excel -->
  </upload-excel>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        Object.keys(item).forEach(key => {
          if (userinfo[userRelations[key]] === 'timeOfEntry' || userinfo[userRelations[key]] === 'correctionTime') {
            userinfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userinfo[userRelations[key]] = item[key]
          }
        })
        arr.push(userinfo)
      })
      await importEmployee(arr) // 调用导入接口
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
