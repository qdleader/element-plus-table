## 基于 Vue3、Element Plus 开发的一款表格组件，对 Element Plus 的 el-table 进行二次封装

**只需要，传如columns，和接口即可把后台的表单搜索项，列表，及分页渲染出了，并支持自定义内容，可以提高开发效率30%左右。**

> TablePlus 组件上的绑定的所有属性和事件都会通过 v-bind="$attrs" 透传到 el-table 上。
> TablePlus 组件内部暴露了 el-table DOM，可通过 TablePlus.value.element.方法名 调用其方法
> 也就是说你想使用 el-table 的任何属性、事件，目前通过属性透传都能支持。

## 安装

```shell
npm install element-plus-table -S
```

## 项目中引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import TablePlus from "element-plus-table"

const app = createApp(App);

app.use(TablePlus)

app.mount('#app')
```

#### 在项目中使用入门案例

```html
<template>
  <TablePlus
    ref="tablePlus"
    title="列表"
    :columns="columns"
    :request-api="getTableList"
    row-key="articleId"
  ></TablePlus>
</template>

<script setup lang="tsx">
import { ref } from "vue"
const rowItem = {
  articleId: 0,
  title: "文章标题",
  origin: 1,
  publishTime: "2024-09-01 12:00:00",
  publishStatus: 2
}
type rowItemType = typeof rowItem
interface paramsReq {
  pageSize: number
  pageNum: number
}
const tablePlus = ref()
// 模拟获取列表接口
const articleList = (params: paramsReq) => {
  return new Promise((resolve) => {
    const entities: rowItemType[] = []
    for (let i = 0; i < 10; i++) {
      entities.push({
        articleId: i,
        title: "文章标题" + i,
        origin: 1,
        publishTime: "2024-09-01 12:00:00",
        publishStatus: 2
      })
    }
    const ressult = {
      total: 100,
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      list: entities
    }
    setTimeout(() => {
      resolve(ressult)
    }, 1500)
  })
}
const getTableList = (params: paramsReq) => {
  const newParams = JSON.parse(JSON.stringify(params))
  // 请求前参数可以在这里处理
  return articleList(newParams)
}

// 表格配置项
const columns = [
  { type: "index", label: "序号", width: 80 },
  {
    prop: "title",
    label: "文章标题0"
  },
  {
    prop: "title",
    label: "文章标题1",
    search: {
      el: "input",
      props: { maxlength: 30, placeholder: "请输入文章标题1" }
    }
  }
]
</script>

```


#### 稍微复杂点案例
```html
<template>
  <TablePlus
    ref="tablePlus"
    title="列表"
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
    :pagination="true"
    :data-callback="dataCallback"
    :reset-callback="resetCallback"
    row-key="articleId"
  >
    <!-- 表格 header 按钮 -->
    <template #tableHeader="scope">
      <el-button type="primary" :icon="CirclePlus" class="mb10">新建</el-button>
      <el-button
        type="primary"
        plain
        :disabled="!scope.isSelected"
        class="mb10"
        @click="batchPublish(scope.selectedListIds, 2)"
      >
        批量发布
      </el-button>
      <el-button
        type="danger"
        :icon="Delete"
        plain
        :disabled="!scope.isSelected"
        class="mb10"
        @click="batchDelete(scope.selectedListIds)"
      >
        批量删除
      </el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button
        type="primary"
        link
        :icon="EditPen"
        @click="openDrawerEdit(scope.row)"
      >
        编辑
      </el-button>
      <el-button type="primary" link :icon="Delete">删除</el-button>
    </template>
  </TablePlus>
</template>

<script setup lang="tsx">
import { ref, reactive } from "vue"
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue"
const rowItem = {
  articleId: 0,
  title: "文章标题",
  origin: 1,
  publishTime: "2024-09-01 12:00:00",
  publishStatus: 2
}
type rowItemType = typeof rowItem
interface paramsReq {
  pageSize: number
  pageNum: number
}
const tablePlus = ref()
const initParam = reactive({
  type: "yyy",
  pageSize: 10,
  hotWordList: []
})
// 模拟获取列表接口
const articleList = (params: paramsReq) => {
  return new Promise((resolve) => {
    const entities: rowItemType[] = []
    for (let i = 0; i < 10; i++) {
      entities.push({
        articleId: i,
        title: "文章标题" + i,
        origin: 1,
        publishTime: "2024-09-01 12:00:00",
        publishStatus: 2
      })
    }
    const ressult = {
      total: 100,
      pageNo: params.pageNum,
      pageSize: params.pageSize,
      entities
    }
    setTimeout(() => {
      resolve(ressult)
    }, 1500)
  })
}
const dataCallback = (data: any) => {
  data?.entities.forEach((item: any) => {
    item.mechanismValue = [item.category, item.column]
  })
  return {
    list: data?.entities,
    total: data.total,
    pageNum: data.pageNo,
    pageSize: data.pageSize
  }
}
const getTableList = (params: paramsReq) => {
  const newParams = JSON.parse(JSON.stringify(params))
  // 请求前参数可以在这里处理
  return articleList(newParams)
}
// 批量删除用户信息
const batchDelete = async (articleIds: string[]) => {
  console.log("articleIds", articleIds)
  // await fetchAPI()
  tablePlus.value?.clearSelection()
  tablePlus.value?.getTableList()
}
const batchPublish = async (articleIds: string[], status: number) => {
  console.log("articleIds: string[], status: number", articleIds, status)
  // await fetchAPI()
  tablePlus.value?.clearSelection()
  tablePlus.value?.getTableList()
}
// 表格配置项
const columns = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "序号", width: 80 },
  {
    prop: "title",
    label: "文章标题0"
  },
  {
    prop: "title",
    label: "文章标题",
    search: {
      el: "input",
      props: { maxlength: 30, placeholder: "请输入文章标题" }
    }
  },
  {
    prop: "title",
    label: "文章标题2",
    search: {
      el: "input",
      order: 10,
      props: { maxlength: 30, placeholder: "请输入文章标题2" }
    }
  },
  {
    prop: "title",
    label: "文章标题3",
    isShow: false,
    search: {
      el: "input",
      order: 1,
      props: { placeholder: "请输入文章标题3" }
    }
  },
  {
    prop: "origin",
    label: "数据来源",
    width: 160,
    enum: [
      {
        label: "文章库",
        value: 1
      },
      {
        label: "自建新增 ",
        value: 2
      }
    ],
    search: { el: "tree-select", props: { filterable: true } }
  },

  {
    prop: "publishTime",
    label: "发布时间",
    width: 180,
    render: (scope) => {
      return <div>{scope.row.publishTime || "- -"}</div>
    }
  },

  {
    prop: "publishStatus",
    label: "是否发布",
    width: 160,
    enum: [
      {
        label: "已发布",
        value: 2
      },
      {
        label: "未发布",
        value: 1
      }
    ],
    search: { el: "tree-select", props: { filterable: true } },
    render: (scope) => {
      return (
        <>
          <el-switch
            model-value={scope.row.publishStatus}
            active-text={scope.row.publishStatus === 2 ? "已发布" : "未发布"}
            active-value={2}
            inactive-value={1}
            onClick={doPublish}
          />
        </>
      )
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 200 }
]
const resetCallback = () => {
  console.log("resetCallBack")
  initParam.hotWordList = []
  tablePlus.value?.getTableList()
}
// 上架
const doPublish = async (params: any) => {
  console.log("doPublish", params)
  // await fetchAPI()
  tablePlus.value?.getTableList()
}
const openDrawerEdit = async (row: Partial<any>) => {
  console.log(row)
}
</script>
<style scoped>
.mb10 {
  margin-bottom: 10px;
}
</style>

```




## 表格中每一项都可以都可以通过render可使用 tsx 组件自定义渲染
```html
<script setup lang="tsx">
const columns = reactive<ColumnProps<User.ResUserList>[]>([{
    prop: "publishTime",
    label: "发布时间",
    width: 180,
    render: (scope) => {
      return <span>{scope.row.publishTime || "- -"}</span>
    }
  },
];
</script>
```


## 表格搜索项可使用 tsx 组件自定义渲染
```html

<script setup lang="tsx">
const columns = reactive<ColumnProps<User.ResUserList>[]>([
   {
    prop: "score",
    label: "分数",
    search: {
      // 自定义 search 组件
      render: ({ searchParam }) => {
        return (
          <div>
            <el-input vModel_trim={searchParam.minAge} placeholder="最小分数"/>
            <span>-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大分数" />
          </div>
        );
      }
    }
  },
];
</script>
```
也就是说search 表单组件我们 可以自定义任意组件放上面，并且可以在请求发出前，对参数进行特殊处理


# TablePlus 属性

| 参数 | 类型 | 是否必填 | 默认值 | 描述| 
| --------  | :-----:   | :-----:   | :-----:  | :----  |
| columns | ColumnProps| 是 | [] |  TablePlus 组件会根据此字段渲染搜索表单与表格列（支持动态更新）| 
| request-api | Function | 否 | - |  获取表格数据的请求 API | 
| data | Array | 否 | - | 静态 tableData 数据（支持分页），若存在则不会使用 request-api 返回的 data| 
| data-callback | Function | 否 | - | 后台返回数据的回调函数，可对后台返回数据进行处理| 
| reset-callback | Function | 否 | - | 用户点击重置按钮的回调函数，可对搜索表单进行参数进行特殊处理| 
| pagination | Boolean | 否 | - | 是否显示分页组件：pagination 为 false 后台返回数据应该没有分页信息 和 list 字段，data 就是 list 数据
| initParam | Object | 否 | {} | 表格请求的初始化参数，该值变化会重新请求表格数据
| rowKey | String | 否 | 'id' | 当表格数据多选时，所指定的 id
| tableSearchColumns | ColumnProps| 否 | [] |  TablePlus 组件会根据此字段渲染搜索表单支持动态更新）有这个参数后就会上面表单就会用这个参数去渲染| 
| request-error | Function | 否 | - | 表格 API 请求错误监听｜

	
# Column 配置（ColumnProps 属性）

| 参数 | 类型 | 是否必填 | 默认值 | 描述| 
| --------  | :-----:   | :-----:   | :-----:  | :----  |
| type | String| 否 | - |  对应列的类型（"index" | "selection" | "radio" | "expand" | "sort"））| 
| tag | Boolean| 否 | false |  前单元格值是否为标签展示，可通过 enum 数据中 tagType 字段指定 tag 类型| 
| isShow | Boolean| 否 | true |  当前列是否显示在表格内（只对 prop 列生效）| 
| search | SearchProps| 否 | - |  搜索项配置，详情见 SearchProps| 
| enum | Array | Function| 否 | - |  可格式化单元格内容，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行）| 
| fieldNames | Object| 否 | - |  指定 label && value && children 的 key 值| 
| headerRender | Function| 否 | - |  自定义表头内容渲染（tsx 语法、h 语法）| 
| render | Function| 否 | - |  自定义表头内容渲染（tsx 语法、h 语法）| 


# 搜索项 配置（SearchProps）：

使用 v-bind="column.search.props“ 通过属性透传将 search.props 属性全部透传到每一项搜索组件上，所以我们支持 input、select、tree-select、date-packer、time-picker、time-select、switch 大部分属性，并在其基础上还扩展了以下 Props：

# Column 配置（ColumnProps 属性）

| 参数 | 类型 | 是否必填 | 默认值 | 描述| 
| --------  | :-----:   | :-----:   | :-----:  | :----  |
| el | String| 否 | - | 当前项搜索框的类型，支持：input、input-number、select、select-v2、tree-select、cascader、date-picker、time-picker、time-select、switch、slider）| 
| labelString | String| 否 | - | 当搜索项 label，如果不指定默认取 column 的 label| 
| props | Object| 否 | - | 根据 element plus 官方文档来传递，该属性所有值会透传到组件| 
| key | String| 否 | - | 当搜索项 key 不为 prop 属性时，可通过 key 指定| 
| order | Number| 否 | - | 搜索项排序（从小到大）| 
| key | String| 否 | - | 当搜索项 key 不为 prop 属性时，可通过 key 指定| 
| defaultValue | Any| 否 | - | 搜索项默认值（该值重置时会重置回初始值）| 
| render | Function| 否 | - | 自定义搜索内容渲染（tsx 语法、h 语法）| 





## TablePlus 的方法：

| 参数 |  描述| 
| --------  | ----:  |
| element | el-table 实例，可以通过TablePlus.value.element.***()来调用 el-table 的所有方法）| 
| getTableList | 获取、刷新表格数据的方法（携带所有参数）| 
| tableData | 当前页面所展示的数据| 
| pageable | 当前表格的分页数据| 
| searchParam | 所有的搜索参数，不包含分页| 
| searchInitParam | 所有的搜索初始化默认的参数| 
| search | 表格查询方法，相当于点击搜索按钮| 
| reset | 重置表格查询参数，相当于点击重置按钮| 
| handleSizeChange | 表格每页条数改变触发的事件| 
| handleCurrentChange | 表格当前页改变触发的事件| 
| clearSelection | 清空表格所选择的数据| 
| enumMap | 当前表格使用的所有字典数据（Map 数据结构）| 
| isSelected | 表格是否选中数据| 
| selectedList | 表格选中的数据列表| 
| selectedListIds | 表格选中的数据列表的id| 

如 在组件中  tablePlus.value?.getTableList() 即可获取最新列表数据


## TablePlus 插槽：
| 插槽 |  描述| 
| --------  | ----:  |
| tableHeader | 自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮| 
| toolButton | 自定义表格头部左右侧侧功能区域的插槽| 
| empty | 当表格数据为空时自定义的内容| 
| pagination | 分页组件插槽| 


	
	

























