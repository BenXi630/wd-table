<template>
  <div class="table-footer">
    <div class="table-footer__left">
      <slot />
    </div>
    <slot name="pagination">
      <el-pagination
        :current-page.sync="currentPage"
        :layout="layout"
        :page-size.sync="pageSize"
        :page-sizes="sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </slot>
  </div>
</template>

<script>

export default {
  name: 'WdTableFooter',
  inject: ['tableScrollTop'],
  props: {
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    sizes: {
      type: Array,
      default: () => [20, 60, 100, 200, 300]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.size
      },
      set(val) {
        this.$emit('update:size', val)
      }
    }
  },
  methods: {
    initPagination({ page, size }) {
      page && (this.currentPage = page)
      size && (this.pageSize = size)
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.$emit('pagination', { page: this.currentPage, size: val })
      this.tableScrollTop && this.tableScrollTop()
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, size: this.pageSize })
      this.tableScrollTop && this.tableScrollTop()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-footer {
  display: flex;
  align-items: center;
  padding: 0 24px;
  overflow-x: auto;
  height: 44px;

  &__left {
    flex: 1;
    margin-right: 24px;
  }
}
</style>
