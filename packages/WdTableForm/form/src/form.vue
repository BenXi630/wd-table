<template>
  <el-form ref="form" :model="model" v-bind="$attrs" v-on="$listeners" @submit.native.prevent>
    <el-row :gutter="rowGutter">
      <el-col
        v-for="(item, index) in fields"
        :key="item.prop || index"
        :span="colSpan"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          :required="item.required"
          :rules="item.rules"
          :class="item.class"
          :style="item.style"
        >
          <custom-render v-if="'render' in item" :model="model" :render="item.render" />

          <slot v-else-if="'slot' in item" :model="model" :name="item.slot" />

          <el-select v-else-if="'enums' in item" v-model="model[item.prop]" v-bind="item.attrs" style="width: 100%">
            <el-option v-for="e in item.enums" :key="e.value" :label="e.label" :value="e.value" />
          </el-select>

          <component
            :is="item.el"
            v-else
            v-model="model[item.prop]"
            style="width: 100%"
            v-bind="typeof item.attrs === 'function' ? item.attrs(model) : item.attrs"
            v-on="item.listeners"
          >
            <custom-render v-if="'childrenRender' in item" :model="model" :render="item.childrenRender" />
          </component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'WdForm',
  components: {
    CustomRender: {
      functional: true,
      props: {
        model: {
          type: Object,
          default: () => ({})
        },
        render: {
          type: Function,
          require: true
        }
      },
      render(h, ctx) {
        return ctx.props.render ? ctx.props.render(h, ctx.props.model) : null
      }
    }
  },
  inheritAttrs: false,
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    rowGutter: {
      type: Number,
      default: null
    },
    colSpan: {
      type: Number,
      default: 24
    }
  },
  methods: {
    validate(callback) {
      return this.$refs.form.validate(callback)
    },
    validateField(props, cb) {
      this.$refs.form.validateField(props, cb)
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
    clearValidate(callback) {
      this.$refs.form.clearValidate(callback)
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-row {
   display: flex;
   flex-wrap: wrap;
 }
</style>
