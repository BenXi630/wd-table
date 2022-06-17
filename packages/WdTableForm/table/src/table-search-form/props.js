export default {
  props: {
    search: {
      type: Boolean,
      default: true
    },
    span: {
      type: Number,
      default: 12
    },
    fields: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    searchForm: {
      type: Object,
      default: () => ({})
    }
  }
}
