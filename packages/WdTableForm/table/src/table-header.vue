<template>
  <div class="table-header">
    <div class="table-header-content">
      <div class="table-header-content__left">
        <wd-table-selection v-show="selectionCount" :selection-count="selectionCount" class="table-header-content__selection">
          <template #default>
            <slot name="selectionItems" />
          </template>
        </wd-table-selection>
        <wd-table-search-form
          v-if="search"
          v-show="!selectionCount"
          ref="searchForm"
          :fields="fields"
          :rules="rules"
          :search-form="searchForm"
          :span="span"
          class="table-header-content__search"
          @update:search-form="$emit('update:search-form', $event)"
          @search-form="handleSearchForm"
        />
      </div>
      <div class="table-header-content__right">
        <slot />
      </div>
    </div>

    <div v-if="formItems.length" class="table-header-form__items">
      <div v-for="item in formItems" :key="item.prop">
        {{ item.label }} <span style="margin-left: 6px">"{{ item.value }}"</span>
        <i class="icon el-icon-close" @click="$refs.searchForm.deleteFormItemValue(item.prop)" />
      </div>
    </div>
  </div>
</template>

<script>
import WdTableSearchForm from './table-search-form'
import WdTableSelection from './table-selection'
import SearchFormProps from './table-search-form/props'

import store from './store'
import { findComponentsDownward } from './utils'

export default {
  name: 'WdTableHeader',
  inject: ['tableScrollTop', 'initPagination'],
  components: {
    WdTableSearchForm,
    WdTableSelection
  },
  mixins: [SearchFormProps],
  inheritAttrs: false,
  data() {
    return {
      selected: {}
    }
  },
  computed: {
    selectionCount() {
      return store.state.selectionCount
    },
    formItems() {
      const items = []

      for (const key in this.searchForm) {
        const value = this.searchForm[key]

        const isTrue = (v) => typeof v === 'boolean' ? true : typeof v === 'number' ? true : v

        const currentField = this.fields.find(field => field.prop === key)

        if (currentField && isTrue(value)) {
          items.push({
            label: currentField.label,
            prop: currentField.prop,
            value: this.selected[currentField.prop] || value
          })
        }
      }
      return items
    }
  },
  watch: {
    'formItems.length': {
      handler() {
        this.setFormItemCount()
      },
      immediate: true
    }
  },
  mounted() {
    this.setSelected()
    this.setFormItemCount()
  },
  activated() {
    this.setFormItemCount()
  },
  methods: {
    setFormItemCount() {
      this.$nextTick(() => {
        store.mutations.setFormItemCount(this.formItems.length)
      })
    },
    handleSearchForm(val) {
      this.setSelected()
      this.initPagination && this.initPagination({ page: 1 })
      this.$emit('search-form', val)
      this.tableScrollTop && this.tableScrollTop()
    },
    setSelected() {
      this.$nextTick(() => {
        this.selected = this.getFormSelected()
      })
    },
    getFormSelected() {
      const selectSelected = findComponentsDownward(this, 'ElSelect').reduce((pre, cur) => {
        if (Array.isArray(cur.selected)) {
          pre[cur.elFormItem.prop] = cur.selected.map(item => `${item.label}`.trim())
        } else {
          pre[cur.elFormItem.prop] = `${cur.selected.label}`.trim()
        }
        return pre
      }, {})
      const cascaderSelected = findComponentsDownward(this, 'ElCascader').reduce((pre, cur) => {
        pre[cur.elFormItem.prop] = cur.presentText
        return pre
      }, {})

      return {
        ...selectSelected,
        ...cascaderSelected
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-header-content {
  max-height: 44px;
  display: flex;
  align-items: center;

  &__left {
    flex: 1;
    height: 100%;
    margin-right: 20px;
  }

  &__right {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 16px;
  }

  &__selection, &__search {
    height: 44px;
  }
}

.table-header-form__items {
  width: 100%;
  height: 56px;
  border-top: 1px solid #ebeef5;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 16px;
  white-space: nowrap;
  overflow-x: auto;
  > div {
    height: 30px;
    padding: 0 10px;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    border-radius: 3px;
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 13px;
    margin-right: 12px;
    .icon {
      cursor: pointer;
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
