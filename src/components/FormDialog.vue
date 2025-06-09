<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width"
             :draggable="true"
             :destroy-on-close="destroyOnClose"
             :close-on-click-modal="false"
             :close-on-press-escape="true">
<!--    插槽-->
    <slot></slot>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit" v-loading="btnLoading">
                    {{ confirmText }}
                </el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,defineProps } from 'vue'

// 对外暴露属性
const props = defineProps({
  title: String, // 字段类型
  width: {
    type: String,
    default: '40%' // 默认值
  },
  destroyOnClose:  {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  }
})
//对外暴露打开关闭模态框方法
const dialogVisible = ref(false)
// 对外暴露一个 submit 方法
const emit  = defineEmits(['submit'])
const submit = () => emit('submit')
// 打开
const open = () => dialogVisible.value = true
// 关闭
const close = () => dialogVisible.value = false

//给提交按钮添加加载动画
const  btnLoading=ref(false)
//显示 loading
const showBtnLoading=()=>btnLoading.value=true;
//隐藏 loading
const closeBtnLoading=()=>btnLoading.value=false;



// 暴露给父组件
defineExpose({
  open,
  close,
  emit,
  submit,
  props,
  closeBtnLoading,
  showBtnLoading
})

</script>
