<template>
  <div v-if="tags.length > 0" class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <!-- 标签标题 -->

    <h2 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
      <svg t="1750037774164" class="icon w-5 h-5 mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4300" ><path d="M741.658197 70.618522C741.624512 70.618522 741.510198 970.8933 741.510198 970.8933 741.510198 967.484367 744.402062 960.328787 757.172574 955.341177 765.103987 952.243531 772.645392 953.032622 778.15685 955.73258 779.929322 956.60087 780.347896 956.945082 780.026811 956.581185L538.476226 682.823858C524.419874 666.893325 499.580126 666.893325 485.523774 682.823858L243.973189 956.581185C243.625181 956.975607 244.002266 956.664356 245.716407 955.815063 251.170364 953.112862 258.658982 952.274232 266.612622 955.317131 279.571439 960.274922 282.489802 967.49526 282.489802 970.8933L282.489802 70.729905C282.489802 70.66506 741.658197 70.618522 741.658197 70.618522ZM211.87128 970.8933C211.87128 1023.036375 262.443093 1042.384138 296.925623 1003.303936L538.476226 729.54659 485.523774 729.54659 727.074377 1003.303936C761.63909 1042.477283 812.12872 1022.758279 812.12872 970.8933L812.12872 70.729905C812.12872 31.552656 780.676537 0 741.658197 0L282.341803 0C243.451901 0 211.87128 31.745727 211.87128 70.729905L211.87128 970.8933Z" fill="#389BFF" p-id="4301"></path></svg>
      标签</h2>
    <!-- 标签列表 -->
    <span v-for="(tag, index) in tags" :key="index" @click="goTagArticleListPage(tag.id, tag.name)"
          class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
            {{ tag.name }}
        </span>
  </div>
</template>

<script setup>
import { getTagList } from '@/api/frontend/tag'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 所有标签
const tags = ref([])
getTagList().then((res) => {
  if (res.success) {
    tags.value = res.data
  }
})
// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（标签 ID、标签名称）
  router.push({path: '/tag/article/list', query: {id, name}})
}
</script>

