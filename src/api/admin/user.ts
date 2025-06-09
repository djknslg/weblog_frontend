import axios from "@/axios.ts";
import type {updateAdminUserPasswordReqVO} from "@/core/model/admin/UpdateAdminUserPassword"

// 登录接口
// 导出一个名为login的函数，该函数接收两个参数：username和password
export function login(username, password) {
  return axios.post("/login", {username, password})
}

/**
 * 获取当前用户
 */
// 获取登录用户信息
export function getUserInfo() {
  return axios.post("/admin/user/info")
}

/**
 * 修改密码
 * @param updateAdminUserPasswordReqVO
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @constructor
 */
export function updateAdminUserPassword(updateAdminUserPasswordData:updateAdminUserPasswordReqVO) {
  return axios.post("/admin/password/update",updateAdminUserPasswordData)
}

