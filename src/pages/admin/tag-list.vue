<script setup lang="ts">
import { RefreshRight, Search } from '@element-plus/icons-vue'
import {  ref,reactive,nextTick } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import moment from 'moment'
import {getTagPageList,deleteTag,addTag} from '@/api/admin/tag'
import {  showMessage, showModel } from '@/composables/util.ts'
import FormDialog from '@/components/FormDialog.vue'
import type { InputInstance } from 'element-plus'
// 分页查询的标签名称
const searchCategoryName = ref('')
// 日期
const pickDate = ref('')
const now = new Date()
const deleteRow = (index: number,id:number) => {
  if (id&&id>0) {
    showModel('是否确定要删除该标签？').then(() => {

      deleteTag(id).then((res) => {
        if (res.success === true) {
          showMessage("删除成功")
          tableData.value.splice(index, 1)
        } else {
          showMessage(res.message, 'error')
        }
      })
      console.log('确定要删除')
    }).catch(() => {
      console.log('取消了')
    })
  }else {
    showMessage("id不存在"+id,'error')
  }


}
const tableData = ref([])
// 当前页码，给了一个默认值 1
const current = ref(1)
// 总数据量，给了个默认值 0
const total = ref(0)
// 每页显示的数据量，给了个默认值 10
const size = ref(10)
// 查询条件：开始结束时间
const startDate = ref();
const endDate = ref();


// 表格加载 Loading
const tableLoading = ref(false)
function getTableData() {
  //显示表格Loading
  tableLoading.value=true;


  //调用后台分页接口，并传入所需参数
  getTagPageList({current:current.value,size:size.value,startDate:startDate.value,endDate:endDate.value,name: searchCategoryName.value})
    .then((res)=>{

      if (res.success===true){
        console.log(res.data)
        tableData.value=res.data
        current.value=res.current
        size.value=res.size
        total.value=res.total
      }
    }).finally(
    setTimeout(() => {
      tableLoading.value = false;
    }, 2000) // 延迟2秒后设置为false
  )
}
getTableData()

// 每页展示数量变更事件
const handleSizeChange = (chooseSize) => {
  size.value = chooseSize
  getTableData()
}

//设置中文
const locale = zhCn;


// 监听日期组件改变事件，并将开始结束时间设置到变量中
const datepickerChange = (e) => {
  startDate.value = moment(e[0]).format('YYYY-MM-DD')
  endDate.value = moment(e[1]).format('YYYY-MM-DD')

  console.log('开始时间：' + startDate.value + ', 结束时间：' + endDate.value)
}

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 重置查询条件
const reset = () => {
  searchCategoryName.value = ''
  pickDate.value = ''
  startDate.value = null
  endDate.value = null
}



//组件变量
const formDialogRef=ref(null)

// 新增标签按钮点击事件
const addCategoryBtnClick = () => {
  formDialogRef.value.open()
}

// 修改用户密码表单对象
const form = reactive({
  tags:[]
})



const  onSubmit=()=>{
  form.tags=dynamicTags.value
    formDialogRef.value.showBtnLoading()
    //请求添加标签接口

    addTag(form).then((res)=>{
      if (res.success===true){
        showMessage('添加成功')
        //将表单数据置空

        //隐藏对话框
        formDialogRef.value.close()
        getTableData()
      }else {
        // 获取服务端返回的错误消息
        let message = res.message
        // 提示错误消息
        showMessage(message, 'error')
      }
    }).finally(
      setTimeout(() => {
        formDialogRef.value.closeBtnLoading()
      }, 2000) // 延迟2秒后设置为false
    )
  // })
}


const inputValue = ref('')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}





</script>

<template>
  <!-- 设置语言为中文 -->
  <el-config-provider :locale="locale">
    <router-view>
      <div>
        <!-- 表头分页查询条件， shadow="never" 指定 card 卡片组件没有阴影 -->
        <el-card shadow="never" class="mb-5">
          <!-- flex 布局，内容垂直居中 -->
          <div class="flex items-center">
            <el-text>标签名称</el-text>

            <div class="ml-3 w-52 mr-5">
              <!-- 日期选择组件（区间选择） -->
              <el-input v-model="searchCategoryName" placeholder="请输入 （模糊查询）"/></div>
            <el-text>创建时间</el-text>
            <div class="ml-3 w-30 mr-5">
              <el-date-picker v-model="pickDate" type="daterange" range-separator="至" start-placeholder="开始时间"
                              end-placeholder="结束时间" size="default" :shortcuts="shortcuts"  @change="datepickerChange"/>
            </div>
            <el-button type="primary"  class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
            <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
          </div>
        </el-card>
        <el-card shadow="never">
          <!-- 新增按钮 -->
          <div class="mb-5">
            <el-button type="primary" @click="addCategoryBtnClick">
              <el-icon class="mr-1">
                <Plus />
              </el-icon>
              新增</el-button>
          </div>
          <div>
            <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" max-height="250"
            >
              <el-table-column prop="name" label="标签名称" width="120" >
                <template #default="scope">
                  <el-tag
                    :type="'success'"
                    disable-transitions
                  >{{scope.row.name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="120" />

              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    size="large"
                    @click.prevent="deleteRow(scope.$index,scope.row.id)"
                  >
                    Remove
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="mt-10 flex justify-center">
              <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50]"
                             :small="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
                             :total="total" @size-change="handleSizeChange" @current-change="getTableData" />
            </div>
          </div>

        </el-card>
      </div>
      <!--      添加标签-->
      <FormDialog ref="formDialogRef"
                  title="新增标签"
                  destroy-on-close  @submit="onSubmit" @close="dynamicTags=[]">
        <el-form ref="formRef"  :model="form">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            class="mr-1"
          >
            {{ tag }}
          </el-tag>

            <el-input
              v-if="inputVisible"
              ref="InputRef"
              style="width: 20%"
              class="ml-1"
              v-model="inputValue"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            添加标签
          </el-button>
        </el-form>
      </FormDialog>
    </router-view>
  </el-config-provider>
</template>

<style scoped>

</style>
