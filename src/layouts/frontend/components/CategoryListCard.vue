<template>
  <div v-if="categories && categories.length > 0" class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <!-- 分类标题 -->
    <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
      <svg t="1750040713688" class="icon w-5 h-5 mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6135" width="200" height="200"><path d="M575.68 736a160.32 160.32 0 1 0 160.32-160.32H599.893333c-13.461333 0-24.192 10.752-24.192 24.192V736zM736 533.333333A202.666667 202.666667 0 1 1 533.333333 736V599.893333A66.432 66.432 0 0 1 599.872 533.333333H736zM490.666667 736a202.666667 202.666667 0 1 1-202.666667-202.666667h136.128A66.432 66.432 0 0 1 490.666667 599.872V736z m-202.666667-160.32a160.32 160.32 0 1 0 160.32 160.32V599.893333c0-13.44-10.730667-24.192-24.192-24.192H288zM533.333333 287.978667A202.666667 202.666667 0 1 1 736 490.666667H599.893333A66.432 66.432 0 0 1 533.333333 424.128V288z m202.666667 160.341333a160.32 160.32 0 1 0-160.32-160.32v136.128c0 13.44 10.730667 24.192 24.192 24.192H736zM448.32 288a160.32 160.32 0 1 0-160.32 160.32h136.128c13.461333 0 24.192-10.752 24.192-24.192V288zM288 490.666667A202.666667 202.666667 0 1 1 490.666667 288v136.128A66.432 66.432 0 0 1 424.128 490.666667H288z" fill="#1AAD19" p-id="6136"></path></svg>
      分类</h2>
    <!-- 分类列表 -->
    <div
      class="text-sm font-medium text-gray-600 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <a @click="goCategoryArticleListPage(category.id, category.name)" v-for="(category, index) in categories" :key="index"
         class="flex items-center w-full px-4 py-2 rounded-lg border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg class="w-3.5 h-3.5 mr-1.5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 21 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
        </svg>
        {{ category.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { getCategoryList } from '@/api/frontend/category.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 所有分类
const categories = ref([])
getCategoryList().then((res) => {
  if (res.success) {
    categories.value = res.data
  }
})
// 引入路由
const router = useRouter()

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（分类 ID、分类名称）
  router.push({path: '/category/article/list', query: {id, name}})
}


</script>

