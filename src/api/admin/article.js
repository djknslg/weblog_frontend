import axios from "@/axios";
import qs from 'qs';

// 获取文章分页数据
export function getArticlePageList(data) {
  return axios.post("/admin/article/list", data)
}

// 删除文章
export function deleteArticle(id) {
  return axios.post("/admin/article/delete", qs.stringify({id}))
}

// 获取文章详情
export function getArticleDetail(id) {
  return axios.post("/admin/article/detail", {id})
}

// 更新文章
export function updateArticle(data) {
  return axios.post("/admin/article/update", data)
}
// 发布文章
export function publishArticle(data) {
  return axios.post("/admin/article/publish", data)
}





