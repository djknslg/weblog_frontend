import  router from '@/router/index.js'
import { getToken } from '@/composables/cookie.js'
import { showMessage } from '@/composables/util.js'
import { showPageLoading ,hidePageLoading } from '@/composables/util'

router.beforeEach((to,from,next)=>{
  console.log('==>全局前置守卫');
  showPageLoading()

  let token=getToken();
  if (!token&&to.path.startsWith('/admin')){
    showMessage("请先登录","warning")
    next({path:'/login'})
  }else if (token&&to.path.startsWith('/login')){
    showMessage("请勿重复登录","warning")
    next({path:'/admin/index'})
  }
  next()

})

// 全局路由后置守卫
router.afterEach((to, from) => {
 let title=(to.meta.title? to.meta.title:'')+' - Weblog'
  document.title=title;
  // 隐藏页面加载 Loading
  hidePageLoading()
})
