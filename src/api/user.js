import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取头像，通过id
export function getUserDetaileById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

export function logout() {

}

