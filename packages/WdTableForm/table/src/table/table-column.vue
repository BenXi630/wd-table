<script>
import { getValueByPath } from 'element-ui/src/utils/util'
import WdTableColumnRender from './table-column-render'

export default {
  name: 'WdTableColumn',
  functional: true,
  inheritAttrs: false,
  inject: ['scopedSlots'],
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  render(h, ctx) {
    const { column } = ctx.props
    if (Object.hasOwnProperty.call(column, 'hidden')) {
      if (typeof column.hidden === 'function') {
        if (column.hidden()) return null
      } else {
        if (column.hidden) return null
      }
    }

    const slotScope = () => {
      const NOT_CUSTOM_RENDER_TYPES = ['index', 'selection']
      if (NOT_CUSTOM_RENDER_TYPES.includes(column.type)) return

      return {
        scopedSlots: {
          default: (scope) => customRender(scope)
        }
      }
    }

    const customRender = (scope) => {
      if ('render' in column) {
        return h(WdTableColumnRender, {
          props: {
            scope: scope,
            render: column.render
          }
        })
      }
      if ('slot' in column) {
        const scopedSlots = ctx.injections.scopedSlots()
        const slotVNode = scopedSlots[column.slot]
        return typeof slotVNode === 'function' ? slotVNode(scope) : null
      }
      return getValueByPath(scope.row, column.prop)
    }

    return h('el-table-column',
      {
        props: column,
        ...slotScope()
      },
      (column.children || []).map((col, index) =>
        h('wd-table-column', {
          props: {
            column: col
          },
          key: index
        })
      ))
  }
}
</script>

<style scoped>

</style>
