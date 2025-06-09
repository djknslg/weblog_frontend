import { ref } from 'vue'

import {useMenuStore}from '@/stores/menu'
import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import type {Tab}from '@/core/presentation/tab'
import {getTabList,setTabList} from '@/composables/cookie.ts'

export function useTabList(){
  const menuStore=useMenuStore();

  const route = useRoute()

  const router=useRouter()

  // 当前被选中的 tab
  const activeTab = ref(route.path)
  const tabList = ref<Tab[]>([
    {
      title: '仪表盘',
      path: "/admin/index"
    },

  ])
  //在路由切换前被调用
  onBeforeRouteUpdate((to,from)=>{
    //设置被激活的Tab标签
    activeTab.value=to.path
    //添加 Tab 标签页
    const newTab: tab.Tab = {
      title: to.meta.title as string,
      path: to.path
    };
    addTab(newTab)
  })

  /**
   * 新增标签栏
   * @param tab
   */
  function addTab(tab:Tab) {
    // 标签是否不存在
    let isTabNotExisted = tabList.value.findIndex(item => item.path == tab.path) == -1
    // 如果不存在
    if (isTabNotExisted) {
      // 添加标签
      tabList.value.push(tab)
    }
    setTabList(tabList.value)


  }

  const tabChange=(path:string)=>{
    console.log(path)
    activeTab.value=path;
    router.push(path)

  }
  /**
   * 移除标签
   * @param path
   */
  const removeTab = (path:string) => {
    let tabs=tabList.value;
    // 当前被选中的 tab 标签
    let actTab=activeTab.value;
    // 如果要删除的是当前被选中的标签页，则需要判断其被删除后，需要激活哪个 tab 标签页
    if (actTab==path){
      tabs.forEach((tab,index)=>{
        // 获取被选中的 tab 元素
        if (tab.path == path) {
          // 拿到被选中的标签页下标，如果它后面还有标签页，则取下一个标签页，否则取上一个
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            actTab = nextTab.path
          }
        }
      })
    }
    //需要激活的标签页
    activeTab.value=actTab;
    // 过滤掉被删除的标签页, 重新设置回去
    tabList.value=tabList.value.filter((tab)=> tab.path!=path)
    //储存到cookie
    setTabList(tabList.value)
    tabChange(activeTab.value)


  }

  /**
   * 初始化标签页
   */
  function initTabList() {
    // 从 cookie 中获取缓存起来的标签导航栏数据
    let tabs :Tab[] = getTabList()
    // 若不为空，则赋值
    if (tabs) {
      tabList.value = tabs
    }
  }

  /**
   *右侧下拉菜单方法
   */
  const  handleCloseTab =((data:string)=>{
    // 首页路由
    let indexPath = '/admin/index'
    if (data=='closeAll'){
      tabList.value=tabList.value.filter((tab)=> tab.path==indexPath)
      // 切换标签页
      tabChange(activeTab.value)
    }else if (data=='closeOthers'){
      const path = activeTab.value
      tabList.value=tabList.value.filter((tab)=>tab.path==path||tab.path==indexPath)
    }

    setTabList(tabList.value)
  })

  // 初始化标签导航栏
  initTabList()
  return{
    menuStore,
    activeTab,
    tabList,
    removeTab,
    tabChange,
    handleCloseTab
  }
}
