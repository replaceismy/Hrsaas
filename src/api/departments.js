import request from '@/utils/request'

// 获取组织信息
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除
export function delDepartments(id) {
  return request({
    url: `company/department/${id}`,
    method: 'delete'
  })
}

// 添加部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 保存编辑的数据
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
