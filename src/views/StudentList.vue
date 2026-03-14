<!-- 学生列表组件 -->
<template>
  <div class="student-list">
    <el-card>
      <!-- title -->
      <div class="card-header">
        <h2>学生列表</h2>
        <el-button type="primary" @click="$router.push('/student/add')">添加学生</el-button>
      </div>
      <!-- search form -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="searchForm.grade" placeholder="请选择年级">
            <el-option label="一年级" value="一年级"></el-option>
            <el-option label="二年级" value="二年级"></el-option>
            <el-option label="三年级" value="三年级"></el-option>
            <el-option label="四年级" value="四年级"></el-option>
            <el-option label="五年级" value="五年级"></el-option>
            <el-option label="六年级" value="六年级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table :data="studentList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column label="操作" width="150">
          <!-- v-slot:default 表示默认插槽，scope 是插槽作用域变量，用于接收子组件-->
          <template v-slot:default="scope">
            <!-- scope 是插槽作用于对象，含有 row 行对象，$index 当前行索引，column 当前列的配置信息，store 表格状态管理对象 -->
            <el-button type="primary" size="small" @click="editStudent(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteStudent(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentList',
  data() {
    return {
      // 查询框
      searchForm: {
        name: '',
        gender: '',
        grade: ''
      },
      // 列表数据
      studentList: [], // table 真实展现的学生列表数据
      originalList: [] // 查询出来的全部学生数据
    }
  },
  // Vue 组件的生命周期钩子函数，在组件挂载到 DOM 后执行，且只会执行一次
  /* 
  当首次进入 StudentList 路由，该组件会被创建并挂在到占位点上，此时 mounted 钩子函数会执行
  */
  mounted() {
    this.getStudentList()
  },
  watch: {
    // Vue Router 插件注入的一个属性
    $route() {
      // 当路由变化时，重新获取学生列表，例如从编辑页面返回列表页面
      this.getStudentList()
    }
  },
  methods: {
    getStudentList() {
      // 模拟请求后端接口，获取学生列表数据
      axios.get('/api/students').then(response => {
        this.studentList = response.data
        this.originalList = response.data
      })
    },
    search() {
      // 本应该做成实时去查询接口，因为没有后端，这里做成了先把数据全查出来后，再通过查询框内的内容做过滤

      // 模拟搜索功能
      let filteredList = [...this.originalList] // 浅拷贝

      if (this.searchForm.name) {
        filteredList = filteredList.filter(student =>
          student.name.includes(this.searchForm.name)
        )
      }
      if (this.searchForm.gender) {
        filteredList = filteredList.filter(student =>
          student.gender === this.searchForm.gender
        )
      }
      if (this.searchForm.grade) {
        filteredList = filteredList.filter(student =>
          student.grade === this.searchForm.grade
        )
      }

      this.studentList = filteredList
    },
    resetSearch() {
      // 重置搜索表单
      this.searchForm = {
        name: '',
        gender: '',
        grade: ''
      }
      // 重新获取学生列表
      this.getStudentList()
    },
    editStudent(id) {
      // 跳转路由页面
      this.$router.push(`/student/edit/${id}`)
    },
    deleteStudent(id) {
      // confirm 是 elementUI 库注入到 Vue 上的一个属性，所以用 $
      this.$confirm('确定要删除这个学生吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除请求
        axios.delete(`/api/students/${id}`).then(() => {
          // message 是 elementUI 库注入到 Vue 上的一个属性，所以用 $
          this.$message.success('删除成功')
          this.getStudentList()
        })
      }).catch(() => {
        // 处理取消操作
      })
    }
  }
}
</script>

<style scoped>
.student-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 20px;
}
</style>
