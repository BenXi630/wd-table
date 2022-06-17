import Vue from 'vue'

const getDefaultState = () => ({
  selectionCount: 0, // 表格多选，选中数量
  formItemCount: 0 // 筛选项数量
})

const state = Vue.observable(getDefaultState())

const mutations = {
  resetState() {
    Object.assign(state, getDefaultState())
  },
  setSelectionCount(count) {
    state.selectionCount = count
  },
  setFormItemCount(count) {
    state.formItemCount = count
  }
}

export default {
  state,
  mutations
}
