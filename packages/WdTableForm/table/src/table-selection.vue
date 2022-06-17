<template>
  <div class="table-selection">
    <div class="table-selection__count">
      已选中
      <span> {{ selectionCount }} </span>
      项
    </div>
    <div class="table-selection__items">
      <slot-default-render :v-node="slotsDefault" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdTableSelection',
  components: {
    SlotDefaultRender: {
      functional: true,
      props: {
        VNode: {
          type: [Array, Object],
          required: true
        }
      },
      render(h, ctx) {
        return ctx.props.VNode ? ctx.props.VNode : null
      }
    }
  },
  props: {
    selectionCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    slotsDefault() {
      return (this.$slots.default || []).map(component => {
        if (component.componentOptions.tag !== 'el-button') return component

        return {
          ...component,
          componentOptions: {
            ...component.componentOptions,
            propsData: {
              size: 'mini',
              ...component.componentOptions.propsData
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-selection {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;

  &__count {
    font-size: 13px;
    color: #777;
    > span {
      color: #409eff;
    }
  }
  &__items {
    flex: 1;
    margin-left: 30px;
    display: flex;
    align-items: center;
    overflow-x: auto;

    ::v-deep .el-button:not(:hover):not(:focus) {
      background-color: #f9f9f9;
      border-color: #e5e5e5;
      color: #666;
    }
  }
}
</style>
