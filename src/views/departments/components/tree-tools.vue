<template>
  <el-row type="flex" justify="space-between" align="middle" style="heigth:40px;width:100%">
    <el-col>
      <!-- 左侧 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="ebd">
        <el-col>
          {{ treeNode.manager }}
        </el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧 -->
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 添加
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 修改
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除
        this.$confirm('是否要删除该部门').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
