<!-- 编辑学生信息的组件 -->
<template>
  <div class="edit-student">
    <el-card>
      <h2>编辑学生</h2>
      <!-- 引入 StudentForm 组件，用于展示和提交学生信息 -->
      <!-- StudentForm 组件在这里是 student-form 这样的标签，固定写法 -->
      <!-- :student-form="studentForm" 写法，用于把 studentForm 数据传递进 student-form 组件中。在子组件中通过 props 接收 -->
      <student-form :student-form="studentForm" @submit="submitForm" @reset="resetForm" @cancel="cancel"></student-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import StudentForm from '../components/StudentForm.vue'

export default {
  // 默认导出此组件
  name: 'EditStudent',
  // 使用了 StudentForm 组件
  components: {
    StudentForm
  },
  data() {
    return {
      // 页面上的表单内容
      studentForm: {
        id: '',
        name: '',
        age: '',
        gender: '男',
        grade: ''
      }
    }
  },
  // 当您从 /student/list 导航到 /student/edit/1 时，会触发 mounted 钩子函数
  // 当您从 /student/edit/1 导航回 /student/list 时，EditStudent 组件实例会被 销毁，又从 /student/list 导航到 /student/edit/2 时，再次创建新的 EditStudent 组件实例
  mounted() {
    this.getStudentInfo()
  },
  methods: {
    getStudentInfo() {
      const id = this.$route.params.id
      // 模拟获取学生信息
      axios.get(`/api/students/${id}`).then(response => {
        if (response.data) { // response 属性：data，status，statusText，headers，config，request
          // 深拷贝学生信息，避免直接修改原始数据
          this.studentForm = JSON.parse(JSON.stringify(response.data))
        }
      })
    },
    // 这里的 formData 参数是由 StudentForm 组件中提交的表单数据，提交到此组件中来
    submitForm(formData) {
      // 模拟更新请求
      axios.put(`/api/students/${this.studentForm.id}`, formData).then(() => {
        this.$message.success('更新成功') // 提示更新成功
        this.$router.push('/student/list') // 进行路由跳转
      })
    },
    resetForm() {
      this.getStudentInfo()
    },
    cancel() {
      // 跳回到学生列表页面
      this.$router.push('/student/list')
    }
  }
}
</script>

<style scoped>
.edit-student {
  padding: 20px;
}
</style>
