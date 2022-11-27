import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'

export default {
  install(vue) {
    vue.component('PageTools', PageTools)
    vue.component('UploadExcel', UploadExcel)
    vue.component('ImageUpload', ImageUpload)
  }
}
