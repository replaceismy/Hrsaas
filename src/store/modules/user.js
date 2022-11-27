import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetaileById } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token

    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseinfo = await getUserDetaileById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseinfo })
    return result
  },
  logout(context) {
    context.commit('removeToken')
    context.commit(' removeUserInfo')
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
