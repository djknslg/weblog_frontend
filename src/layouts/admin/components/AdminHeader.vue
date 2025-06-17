<script setup lang="ts">

import { useMenuStore } from '@/stores/menu'

// 引入 useFullscreen
import { useFullscreen } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

import { useRouter } from 'vue-router'
import { show, showMessage } from '@/composables/util.ts'
import FormDialog from '@/components/FormDialog.vue'
import { reactive, ref } from 'vue'
import type { updateAdminUserPasswordReqVO } from '@/core/model/admin/UpdateAdminUserPassword'
import { updateAdminUserPassword } from '@/api/admin/user.ts'

// 引入了用户 Store
const router = useRouter()

// 引入了用户 Store
const userStore = useUserStore()



// isFullscreen 表示当前是否处于全屏；toggle 用于动态切换全屏、非全屏
const { isFullscreen, toggle } = useFullscreen()

// 引入了菜单 store
const menuStore = useMenuStore()

// icon 点击事件
const handleMenuWidth = () => {
  // 动态设置菜单的宽度大小
  menuStore.handleMenuWidth()
}
// 刷新页面
const handleRefresh = () => location.reload()
//组件变量
const fromPasswrod=ref()
// 下拉菜单事件处理
const handleCommand = (command) => {
  // 更新密码
  if (command == 'updatePassword') {
    // 省略...
    fromPasswrod.value.open()

  } else if (command == 'logout') { // 退出登录
    console.log("logout")
    logout()
  }
}
//修改密码对象
const passwordUpdateData:updateAdminUserPasswordReqVO=reactive({
  username:'',
  password:'',
})
const pwdUpdatefromRef=ref(null)

const rules={
  password:[
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 7, max: 30, message: '密码要求大于 8 个字符，小于 30 个字符', trigger: 'blur' },
  ]
}

const pwdUpdateOnSbmit=()=>{
  //验证表单字段
  pwdUpdatefromRef.value.validate((valid)=>{
    if (!userStore.userInfo.username){
      showMessage("用户名为空,更改密码失败",'error')
      return false
    }
    passwordUpdateData.username=userStore.userInfo.username;
    if (!valid){
      showMessage('表单验证不通过','warning')
      return false
    }
    fromPasswrod.value.showBtnLoading()
    updateAdminUserPassword(passwordUpdateData).then((res)=>{
      if (res.success===true){
        showMessage("修改成功")
        passwordUpdateData.username=''
        passwordUpdateData.password=''

      }else {
        showMessage("修改失败，原因："+res.message,"warning")
      }
    }).finally(
      ()=>{
        fromPasswrod.value.closeBtnLoading
        fromPasswrod.value.close()
      }


    )

  })

}



// 退出登录
function logout() {
  // showModel('是否确认要退出登录？').then(() => {
  //   userStore.logout()
  //   showMessage('退出登录成功！')
  //   // 跳转登录页
  //   router.push('/login')
  // })
  show('是否确认要退出吗','退出登录成功','取消成功',undefined,undefined,()=>{
    userStore.logout()
    console.log("退出")
    router.push('/login')
  });





}



</script>


<template>
<el-affix :offset="0">
  <!-- 设置背景色为白色、高度为 64px，padding-right 为 4， border-bottom 为 slate 200 -->
  <div class="bg-white h-[64px] flex pr-4 border-b border-slate-200 border-slate-100">
    <!-- 左边栏收缩、展开 -->
    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200" @click="handleMenuWidth">
      <el-icon>
        <Fold v-if="menuStore.menuWidth == '250px'"/>
        <Expand v-else />
      </el-icon>
    </div>

    <!-- 右边容器，通过 ml-auto 让其在父容器的右边 -->
    <div class="ml-auto flex">
      <!-- 点击刷新页面 -->
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
             @click="handleRefresh">
          <el-icon>
            <Refresh />
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 点击全屏展示 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200" @click="toggle">
            <el-icon>
              <FullScreen v-if="!isFullscreen" />
              <Aim v-else />
            </el-icon>
        </div>
      </el-tooltip>
      <!-- 点击跳转前台首页 -->
      <el-tooltip class="box-item" effect="dark" content="跳转前台" placement="bottom">
        <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
             @click="router.push('/')">
          <el-icon>
            <Monitor />
          </el-icon>
        </div>
      </el-tooltip>


      <!-- 登录用户头像 -->
      <el-dropdown class="flex items-center justify-center"
      @command="handleCommand">
                <span class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs">
                    <!-- 头像 Avatar -->
                    <el-avatar :size="25" src="https://img.quanxiaoha.com/quanxiaoha/f97361c0429d4bb1bc276ab835843065.jpg" />
                    {{ userStore.userInfo.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</el-affix>
  <FormDialog title="修改密码" width="40%" ref="fromPasswrod" @submit="pwdUpdateOnSbmit" >
    <el-form ref="pwdUpdatefromRef":rules="rules" :model="passwordUpdateData" >
      <el-form-item label="新密码"
                    prop="password"
                    label-width="80px"
                    size="large">
        <el-input v-model="passwordUpdateData.password" placeholder="请输入密码" type="password" maxlength="20" show-word-limit clearable/>

      </el-form-item>
    </el-form>
  </FormDialog>
</template>


<style scoped>

</style>
