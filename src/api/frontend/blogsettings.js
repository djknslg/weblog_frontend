import axios from "@/axios.js";

// 获取博客设置详情
export function getBlogSettingsDetail() {
  return axios.post("/blog/settings/detail")
}
