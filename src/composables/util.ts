// 消息提示
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import nprogress from 'nprogress';

/**
 * 统一消息模版
 * @param message
 * @param type
 * @param customClass
 */
export function showMessage( message: string = '提示内容',type = 'success', customClass = '') {
  return ElMessage({
    type: type,
    message,
    customClass,
  })
}

// 显示页面加载 Loading
// 导出一个名为 showPageLoading 的函数，用于显示页面加载进度条
export function showPageLoading() {
  // 调用 nprogress 库的 start 方法，开始显示进度条
  nprogress.start()
}

// 弹出确认框
export function showModel(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}


export function show(
  content = '提示内容',
  success = '成功',
  cancel = "取消",
  type = 'warning',
  title = '',
  onSuccess?: () => void,
  onCancel?: () => void
) {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type,
    }
  )
    .then(() => {
      if (onSuccess) {
        onSuccess();
      }
      ElMessage({
        type: 'success',
        message: success,
      });

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: cancel,
      });
      if (onCancel) {
        onCancel();
      }
    });
}


// 隐藏页面加载 Loading
// 导出一个名为 hidePageLoading 的函数，用于隐藏页面加载进度条
export function hidePageLoading() {
  // 调用 nprogress 对象的 done 方法，该方法用于完成并隐藏进度条
  nprogress.done()
}
