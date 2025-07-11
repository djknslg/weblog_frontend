import Index from '@/pages/frontend/index.vue'
import login from '@/pages/admin/login.vue'
import  AdminIndex from '@/pages/admin/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '@/layouts/admin/admin.vue'
import AdminArticleList from '@/pages/admin/article-list.vue'
import AdminCategoryList from '@/pages/admin/category-list.vue'
import AdminTagList from '@/pages/admin/tag-list.vue'
import AdminBlogSetting from '@/pages/admin/blog-setting.vue'
import ArchiveList from '@/pages/frontend/archive-list.vue'
import CategoryList from '@/pages/frontend/category-list.vue'
import CategoryArticleList from '@/pages/frontend/category-article-list.vue'
import TagList from '@/pages/frontend/tag-list.vue'
import TagArticleList from '@/pages/frontend/tag-article-list.vue'
import ArticleDetail from '@/pages/frontend/article-detail.vue'
import NotFound from '@/pages/frontend/404.vue'




// 统一在这里声明所有路由
const routes = [
  {
    path: '/', // 路由地址
    component: Index, // 对应组件
    meta: { // meta 信息
      title: 'Weblog 首页' // 页面标题
    }
  },
  {
    path: '/login',
    component: login,
    meta:{
      title: 'Weblog 登录'
    }
  },
  {
    path: '/archive/list', // 归档页
    component: ArchiveList,
    meta: { // meta 信息
      title: 'Weblog 归档页'
    }
  },
  {
    path: '/category/list', // 分类页
    component: CategoryList,
    meta: { // meta 信息
      title: 'Weblog 分类页'
    }
  },
  {
    path: '/category/article/list', // 分类文章页
    component: CategoryArticleList,
    meta: { // meta 信息
      title: 'Weblog 分类文章页'
    }
  },
  {
    path: '/tag/list', // 标签列表页
    component: TagList,
    meta: { // meta 信息
      title: 'Weblog 标签列表页'
    }
  },
  {
    path: '/tag/article/list', // 标签列表页
    component: TagArticleList,
    meta: { // meta 信息
      title: 'Weblog 标签文章页'
    }
  },
  {
    path: '/article/:articleId', // 文章详情页
    component: ArticleDetail,
    meta: { // meta 信息
      title: 'Weblog 详情页'
    }
  },
  {
    path: '/:pathMatch(.*)*',  //404页
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 页'
    }
  },

  {
    path: "/admin",
    component: Admin,
    children:[
      {
        path: "/admin/index",
        component: AdminIndex,
        meta: {
          title: '仪表盘'
        }
      },
      {
        path: "/admin/article/list",
        component: AdminArticleList,
        meta: {
          title: '文章管理'
        }
      },
      {
        path: "/admin/category/list",
        component: AdminCategoryList,
        meta: {
          title: '分类管理'
        }
      },
      {
        path: "/admin/tag/list",
        component: AdminTagList,
        meta: {
          title: '标签管理'
        }
      },
      {
        path: "/admin/blog/setting",
        component: AdminBlogSetting,
        meta: {
          title: '博客设置'
        }
      },
    ]
  }


]

// 创建路由
const router = createRouter({
  // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
  history: createWebHashHistory(),
  // routes: routes 的缩写
  routes,
})

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router
