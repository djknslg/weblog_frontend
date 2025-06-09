import axios from "@/axios.js";

// 获取标签分页数据
export function getTagPageList(data) {
  return axios.post("/admin/tag/pageList", data)
}
//添加标签
export function addTag(data) {
  return axios.post("/admin/tag/add",data)
}
//删除标签
export function deleteTag(id) {
  return axios.post("/admin/tag/delete",{id})
}
//获取所有标签
export function getTagSelectList() {
  return axios.post("/admin/select/list")
}
//获取所有标签
export function getTagSearchList(name) {
  return axios.post("/admin/tag/search",{name})
}

