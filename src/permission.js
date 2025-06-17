import  router from '@/router/index.js'
import { getToken } from '@/composables/cookie.js'
import { showMessage } from '@/composables/util.js'
import { showPageLoading ,hidePageLoading } from '@/composables/util'
import { useBlogSettingsStore } from '@/stores/blogsettings.js'

router.beforeEach((to,from,next)=>{
  console.log('==>全局前置守卫');
  // 展示页面加载 Loading
  showPageLoading()

  let token=getToken();
  if (!token&&to.path.startsWith('/admin')){
    showMessage("请先登录","warning")
    next({path:'/login'})
  }else if (token&&to.path.startsWith('/login')){
    showMessage("请勿重复登录","warning")
    next({path:'/admin/index'})
  }else if (!to.path.startsWith('/admin')) {
    // 如果访问的非 /admin 前缀路由
    // 引入博客设置 store
    let blogSettingsStore = useBlogSettingsStore()
    // 获取博客设置信息并保存到全局状态中
    blogSettingsStore.getBlogSettings()
    next()
  } else {
    next()
  }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
 let title=(to.meta.title? to.meta.title:'')+' - Weblog'
  document.title=title;
  // 隐藏页面加载 Loading
  hidePageLoading()
})
