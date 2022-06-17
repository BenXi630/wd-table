<template>
  <div class="wd-table-group">

    <div v-if="$scopedSlots.tools" class="wd-table_tools">
      <slot name="tools" />
    </div>

    <div v-if="$scopedSlots.header" class="wd-table__header">
      <slot name="header" />
    </div>

    <div :style="{height: `calc(100% - ${contentHeight}px)`}" class="wd-table__content">
      <slot />
    </div>

    <div v-if="$scopedSlots.footer" class="wd-table__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import store from './store'
import { findComponentDownward } from './utils'

export default {
  name: 'WdTableGroup',
  provide() {
    return {
      tableScrollTop: (top = 0) => {
        const table = findComponentDownward(this, 'WdTable')
        table && table.scrollTop(top)
      },
      initPagination: ({ page, size }) => {
        const footer = findComponentDownward(this, 'WdTableFooter')
        footer && footer.initPagination({ page, size })
      }
    }
  },
  computed: {
    formItemCount() {
      return store.state.formItemCount
    },
    contentHeight() {
      const heightVariants = {
        tools: 46,
        header: 44,
        footer: 44
      }

      let height = this.formItemCount ? 56 : 0

      for (const key in this.$scopedSlots) {
        if (key in heightVariants) {
          height += heightVariants[key]
        }
      }

      return height
    }
  }
}
</script>

<style lang="scss" scoped>
.wd-table-group {
  height: 100%;
}
.wd-table_tools {
  max-height: 46px;
}

.wd-table__header, .wd-table__footer {
  position: relative;
  background-color: #fff;
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    border-top: 1px solid #EBEEF5;
    top: 0;
    left: 0;
    right: 0;
  }
}
.wd-table__footer {
  max-height: 44px;
  &::before {
    top: initial;
    bottom: 0;
  }
}
</style>
