<!-- 添加学生信息的组件 -->
<template>
  <div class="add-student">
    <el-card>
      <h2>添加学生</h2>
      <student-form
        :student-form="studentForm"
        @submit="submitForm"
        @reset="resetForm"
        @cancel="cancel"
      ></student-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import StudentForm from '../components/StudentForm.vue'

export default {
  name: 'AddStudent',
  components: {
    StudentForm
  },
  data() {
    return {
      studentForm: {
        name: '',
        age: '',
        gender: '男',
        grade: ''
      }
    }
  },
  methods: {
    submitForm(formData) {
      // 模拟提交请求
      axios.post('/api/students', formData).then(() => {
        this.$message.success('添加成功')
        this.$router.push('/student/list')
      })
    },
    resetForm() {
      this.studentForm = {
        name: '',
        age: '',
        gender: '男',
        grade: ''
      }
    },
    cancel() {
      this.$router.push('/student/list')
    }
  }
}
</script>

<style scoped>
.add-student {
  padding: 20px;
}
</style>
