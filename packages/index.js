import Form from './WdTableForm/form'
import Table from './WdTableForm/table'
import TableGroup from './WdTableForm/table-group'
import TableTools from './WdTableForm/table-tools'
import TableHeader from './WdTableForm/table-header'
import TableFooter from './WdTableForm/table-footer'

const components = [Form, Table, TableGroup, TableTools, TableHeader, TableFooter]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Form,
  Table,
  TableGroup,
  TableTools,
  TableHeader,
  TableFooter
}
