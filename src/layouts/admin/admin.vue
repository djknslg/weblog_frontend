<script setup lang="ts">

import AdminMenu from '@/layouts/admin/components/AdminMenu.vue'
import AdminHeader from '@/layouts/admin/components/AdminHeader.vue'
import AdminTagList from '@/layouts/admin/components/AdminTagList.vue'
import AdminFooter from '@/layouts/admin/components/AdminFooter.vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
</script>

<template>
<!--&lt;!&ndash;  外部容器&ndash;&gt;-->
<!--  <el-container>-->
<!--&lt;!&ndash;    左边导航栏&ndash;&gt;-->
<!--    <el-aside></el-aside>-->
<!--&lt;!&ndash;    主容器&ndash;&gt;-->
<!--    <el-main>Main</el-main>-->
<!--  </el-container>-->
<!--  &lt;!&ndash; 外层容器 &ndash;&gt;-->


  <el-container>

    <!-- 左边侧边栏 -->
    <el-aside :width='menuStore.menuWidth' class="transition-all duration-300">
      <AdminMenu></AdminMenu>
    </el-aside>

    <!-- 右边主内容区域 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>

      <el-main>
        <AdminTagList></AdminTagList>

        <!-- 主内容（根据路由动态展示不同页面） -->
        <router-view v-slot="{ Component }">
<!--          添加动画标签-->
          <Transition>
            <!-- max 指定最多缓存 10 个组件 -->
            <KeepAlive :max="10">
              <component :is="Component"></component>
            </KeepAlive>
          </Transition>
        </router-view>
      </el-main>

      <!-- 底栏容器 -->
      <el-footer>
        <AdminFooter></AdminFooter>
      </el-footer>
    </el-container>
  </el-container>

</template>

<style scoped>
.el-header {
  padding: 0!important;
}

.el-footer {
  padding: 0!important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 内容区域过渡动画：淡入淡出效果 */
/* 刚开始进入时 */
.fade-enter-from {
  /* 透明度 */
  opacity: 0;
}

/* 刚开始结束 */
.fade-enter-to {
  opacity: 1;
}

/* 刚开始离开 */
.fade-leave-from {
  opacity: 1;
}

/* 离开已结束 */
.fade-leave-to {
  opacity: 0;
}

/* 离开进行中 */
.fade-leave-active {
  transition: all 0.3s;
}

/* 进入进行中 */
.fade-enter-active {
  transition: all 0.3s;
  transition-delay: 0.3s;
}

</style>
