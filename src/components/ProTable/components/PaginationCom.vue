<template>
  <!-- 分页组件 -->
  <div class="pagination-box">
    <el-pagination
      :background="true"
      :current-page="pageable.pageNum"
      :page-size="pageable.pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :total="pageable.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts" name="PaginationCom">
import { defineProps } from "vue"
interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

defineProps<PaginationProps>()
</script>
<style lang="scss" scoped>
.pagination-box {
  margin-top: 20px;
  float: right;
}
</style>
