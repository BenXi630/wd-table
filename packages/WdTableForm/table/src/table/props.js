export default {
  props: {
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    headerCellStyle: {
      type: Object,
      default: () => ({
        backgroundColor: '#fafdff',
        color: '#475059'
      })
    }
  }
}
