<template>
  <div class="search-form">
    <div
      class="search-form__text"
      @click="handleShowSearchForm"
    >
      <img
        alt=""
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcxMEMyOTg1QzBBMzExRThCRjRERkU3Mzg5NDBDQTlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcxMEMyOTg2QzBBMzExRThCRjRERkU3Mzg5NDBDQTlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzEwQzI5ODNDMEEzMTFFOEJGNERGRTczODk0MENBOUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzEwQzI5ODRDMEEzMTFFOEJGNERGRTczODk0MENBOUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4G5F1NAAAA5UlEQVR42mJctWpVAwMDQyUQszGQBn4CcRMLkKgC4j9AfJZEA7SBuAZkwEUgNgTiTCA+TaRmJyDeA8SHmIBEERCD6NlAzEKEZj4gng/EH4E4EaTxMBAvB2J9IC4hwoB+IJYD4lQgvs8EFSwD4i9AXAfEKng0+wBxEhDPAOI1DFCng8BTIG4FYk6oJCMWzUJQb4LCrBAmyITmtNtA7AzE8VgMmA7EvEAcAcQ/sBnwE8nkDjTNnUAcBsRZQHwDWYIJTeFWKC2OJl4GpRehO4uJgUIwDAzAlnQ3UWqA/4B7gYEUbwEEGAANECY5RBCuPwAAAABJRU5ErkJggg=="
      >
      高级筛选
    </div>

    <el-dialog
      ref="dialog"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      append-to-body
      title="高级筛选"
      width="700px"
      @close="searchFormClose"
      @open="searchFormOpen"
    >
      <wd-form
        ref="form"
        :col-span="span"
        :fields="fields"
        :model="selfForm"
        :row-gutter="40"
        :rules="rules"
        label-position="top"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleReset">重 置</el-button>
        <el-button type="primary" @click="handleSearchConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WdForm from '../../../form'
import props from './props'

import { deepClone } from '../utils'

// 记录第一次加载的初始值
let initForm = null

export default {
  name: 'WdTableSearchForm',
  components: {
    WdForm
  },
  mixins: [props],
  data() {
    return {
      selfForm: deepClone(this.searchForm),
      dialogVisible: false
    }
  },
  created() {
    initForm = deepClone(this.selfForm)
  },
  mounted() {
    this.$refs.dialog.rendered = true
  },
  methods: {
    handleShowSearchForm() {
      if (!this.fields.length) {
        return this.$message.error('暂无筛选项')
      }

      this.dialogVisible = true
    },
    // 打开表单，清除校验
    searchFormOpen() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 搜索弹出关闭, 还原form的值
    searchFormClose() {
      this.selfForm = deepClone(this.searchForm)

      this.dialogVisible = false
    },
    // 删除某个筛选项的值
    deleteFormItemValue(prop) {
      delete this.selfForm[prop]

      this.confirm()
    },
    // 重置筛选
    handleReset() {
      this.selfForm = deepClone(initForm)

      this.confirm()
    },
    // 确认筛选
    handleSearchConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirm()
        }
      })
    },
    confirm() {
      const params = deepClone(this.selfForm)

      this.$emit('update:search-form', params)

      this.$emit('search-form', params)

      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-weight: normal;
}

.search-form {
  width: 100%;
  height: 100%;
  font-size: 13px;
  &__text {
    width: max-content;
    min-height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    cursor: pointer;
    > img {
      width: 12px;
      height: 13.5px;
      margin-right: 8px;
    }
  }
}
</style>
