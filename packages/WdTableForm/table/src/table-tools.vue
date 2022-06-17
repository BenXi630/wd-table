<template>
  <div class="table-tools">
    <div class="table-tools__left">
      <slot name="search">
        <el-input
          v-model="keyword"
          :placeholder="placeholder"
          clearable
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          />
        </el-input>
      </slot>
    </div>

    <div class="table-tools__right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdTableTools',
  inject: ['tableScrollTop', 'initPagination'],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    }
  },
  computed: {
    keyword: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleSearch() {
      this.initPagination && this.initPagination({ page: 1 })
      this.$emit('search', this.keyword)
      this.tableScrollTop && this.tableScrollTop()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-tools {
  display: flex;
  height: 46px;
  &__right {
    margin-left: 30px;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}
</style>
