<script lang="ts" setup>

import { User,Lock } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { login } from '@/api/admin/user.ts'
import { useRouter } from 'vue-router'
import { showMessage} from '@/composables/util'
import { setToken } from '@/composables/cookie.ts'
import{useUserStore} from  '@/stores/user'

const userStore=useUserStore();
//定义响应式的表单提交对象
const from =reactive({
  username:'',
  password:''
});
//表单引用
const formRef=ref(null)
//添加验证规则
const rules={
  username: [
    {
      required:true,
      message:'用户不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ]
}


//登录按钮加载
const loading=ref(false)

const router = useRouter()
// 登录
const OnSubmit = () => {
  console.log("登录");
  // 先验证 form 表单字段
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log('表单验证不通过')
      return false
    }
    loading.value=true;
    login(from.username, from.password).then((res) => {
      if (res.success == true) {
        showMessage("登录成功")
        setToken(res?.data?.token)
        //获取用户信息
        userStore.setUserInfo()
        console.log(userStore.userInfo)
        router.push('/admin/index')
      } else {
        showMessage(res?.message, 'error')
      }
      console.log(res);
    }).finally(()=>{
      //结束加载

      loading.value=false
    })
  })
}
    //按回车登录
    function okKeyUp(e) {
      if (e.key == 'Enter') {
        OnSubmit()
      }

      //添加键盘监听
      onMounted(() => {
        document.addEventListener('keyup', okKeyUp)
      });
      //移除键盘监听
      onBeforeUnmount(() => {
        document.removeEventListener('keyup', okKeyUp)
      });
    }




</script>
<template>
  <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏 -->
  <div class="grid grid-cols-2 h-screen">
    <!-- 默认先适配移动端，占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端）；背景色为黑色 -->
    <!-- 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端） -->
    <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-[#3b5998] animate__animated animate__bounceInLeft animate__fast">
      <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
      <div class="flex justify-center items-center h-full flex-col">
        <h2 class="font-bold text-4xl mb-7 text-white">Weblog 博客登录</h2>
        <p class="text-white">一款由 Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4 开发的前后端分离博客。</p>
        <!-- 指定图片宽度为父级元素的 1/2 -->
        <img src="@/assets/cow.png" class="w-1/2">
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast
" >
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
          <div class="flex items-center justify-center mb=7 text-gray-400 space-x-2">
<!--            左边横线高度1px 宽度16 设置背景色-->
            <span class="h-[1px] w-16 bg-gray-200"></span>
            <span>账号密码登录</span>
            <span class="h-[1px] w-16 bg-gray-200"></span>
          </div>
          <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
          <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="from">
            <el-form-item prop="username">
<!--              输入框组件-->
              <el-input size="large" v-model="from.username"   placeholder="请输入用户名" :prefix-icon="User" clearable/>
            </el-form-item>
            <el-form-item prop="password">
<!-- 输入框组件，设置类型为密码，并设置清除按钮 -->
              <el-input size="large" v-model="from.password" placeholder="请输入密码" type="password" :prefix-icon="Lock" clearable show-password/>
            </el-form-item>
            <el-form-item>
              <!-- 登录按钮，宽度设置为 100% -->
              <el-button  type="primary" size="large" :loading="loading" @click="OnSubmit" class="w-full">登录</el-button>
            </el-form-item>
          </el-form>
      </div>

    </div>
  </div>
</template>


<style scoped>

</style>
