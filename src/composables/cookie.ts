import { useCookies } from '@vueuse/integrations/useCookies'
import type { Tab } from '@/core/presentation/tab'

// 存储在 Cookie 中的 Token 的 key
const TOKEN_KEY = 'Authorization'
const cookie = useCookies()

// 获取 Token 值
export function getToken() {
  return cookie.get(TOKEN_KEY)
}

// 设置 Token 到 Cookie 中
export function setToken(token) {
  return cookie.set(TOKEN_KEY, token)
}

// 删除 Token
export function removeToken() {
  return cookie.remove(TOKEN_KEY)
}

const  TAB_LIST_KEY = 'tabList'
// 获取 TabList
export function getTabList(){
  return cookie.get(TAB_LIST_KEY)
}

// 存储 TabList 到 Cookie 中
export  function setTabList(tabList:Tab[]) {
  return cookie.set(TAB_LIST_KEY, tabList)
}
