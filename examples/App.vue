<template>
  <div id="app">
    <wd-table-group>
      <template #tools>
        <wd-table-tools v-model="keyword" @search="handleSearch">
          <el-button type="primary">新增</el-button>
        </wd-table-tools>
      </template>
      <template #header>
        <wd-table-header :fields="fields" :search-form.sync="form" @search-form="handleSearch">
          <template #selectionItems>
            <el-button>删除所选</el-button>
          </template>
        </wd-table-header>
      </template>
      <wd-table :columns="columns" :data-source="dataSource">
        <template #handle="{ row }">
          <el-button type="text" @click="handleLook(row)">查看</el-button>
        </template>
      </wd-table>
      <template #footer>
        <wd-table-footer
            :page.sync="pagination.page"
            :size.sync="pagination.size"
            :total="pagination.total"
            @pagination="handlePagination"
        />
      </template>
    </wd-table-group>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      keyword: '',
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      columns: [
        {
          type: 'selection',
          width: 50,
          fixed: 'left'
        },
        {
          label: '序号',
          type: 'index',
          width: 70,
          fixed: 'left'
        },
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '配送信息',
          children: [
            {
              label: '姓名',
              prop: 'name',
            },
            {
              label: '性别',
              render: (h, {row}) => h('span', row.gender === 1 ? '男' : '女')
            },
            {
              label: '地址',
              children: [
                {
                  label: '省份',
                  prop: 'address.province',
                },
                {
                  label: '市区',
                  prop: 'address.city',
                },
                {
                  label: '地址',
                  prop: 'address.detail',
                },
              ]
            }
          ]
        },
        {
          label: '操作',
          slot: 'handle'
        }
      ],
      dataSource: Array.from({length: 40}).map((_, index) => ({
        date: new Date().getTime() + index * 1000,
        name: '王小虎',
        gender: index % 2 === 0 ? 1 : 2,
        address: {
          province: '上海',
          city: '普陀区',
          detail: '上海市普陀区金沙江路 1518 弄',
        }
      })),
      fields: [
        {
          el: 'el-input',
          label: '姓名',
          prop: 'name',
          attrs: {
            placeholder: '请输入姓名'
          }
        },
        {
          label: '性别',
          prop: 'gender',
          enums: [{label: '男', value: 1}, {label: '女', value: 2}],
          attrs: {
            placeholder: '请选择性别'
          }
        },
        {
          label: '自定义',
          prop: 'custom',
          render: (h, originalForm) => h('el-button', JSON.stringify(originalForm))
        }
      ],
      form: {}
    }
  },
  methods: {
    handleLook(row) {
      console.log(row)
    },
    handleSearch(params) {
      console.log(params, this.form, this.keyword)
    },
    handlePagination(pagination) {
      console.log(pagination)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fafafa;
}
</style>
