<template>
  <el-table
    ref="table"
    :border="border"
    :data="dataSource"
    :header-cell-style="headerCellStyle"
    :height="height"
    :row-key="rowKey"
    :stripe="stripe"
    style="width: 100%"
    v-bind="$attrs"
    v-on="$listeners"
    @selection-change="handleSelectionChange"
  >
    <template #append>
      <slot name="append" />
    </template>
    <wd-table-column v-for="(col, index) in columns" :key="index" :column="col" />
  </el-table>
</template>

<script>
import WdTableColumn from './table-column'
import props from './props'

import store from '../store'

export default {
  name: 'WdTable',
  components: {
    WdTableColumn
  },
  mixins: [props],
  provide() {
    return {
      scopedSlots: () => this.$scopedSlots
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.table && this.doLayout()
    })
  },
  mounted() {
    this.resetState()
  },
  activated() {
    this.resetState()
  },
  methods: {
    resetState() {
      this.clearSelection()
      store.mutations.resetState()
      this.handleSelectionChange([])
    },
    handleSelectionChange(value) {
      store.mutations.setSelectionCount(value.length)
      this.$emit('selection-change', value)
    },
    // 以下均为 Table Methods
    scrollTop(top = 0) {
      this.$refs.table && (this.$refs.table.bodyWrapper.scrollTop = top)
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.table.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.table.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.table.doLayout()
    },
    sort(prop, order) {
      this.$refs.table.sort(prop, order)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body-wrapper {
  z-index: 1;
}
</style>
