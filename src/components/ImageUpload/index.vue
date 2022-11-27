<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :http-request="upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 弹层 -->
    <el-dialog :visible="showDialog" title="图片预览" @close="imgCancel">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDcKQezXaOMOKEygQC3pSxQxNZ2Z5c0XCv',
  SecretKey: 'ufIrS7mR9sY7raZbGZsJdq2c7ZpKrFWi'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      return true
    },
    upload(params) {
      console.log(params.file)
      if (params.file) {
        cos.putObject({
          Bucket: 'renzi-01-1315399773',
          Region: 'ap-chongqing',
          StorageClass: 'STANDARD',
          Key: params.file.name,
          Body: params.file
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
          }
        })
      }
    },
    imgCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
