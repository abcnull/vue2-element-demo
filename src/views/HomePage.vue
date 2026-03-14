<!-- 首页组件 -->
<template>
  <div class="home">
    <el-card>
      <h2>学生管理系统</h2>
      <p>欢迎使用学生管理系统，这是一个基于Vue 2和Element UI的前端项目示例。</p>
      <!-- 因为 Vue 实例中注入了 router，所以 -->
      <el-button type="primary" @click="$router.push('/student/list')">进入学生列表</el-button>
    </el-card>
  </div>
</template>

<script lang="js">
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
