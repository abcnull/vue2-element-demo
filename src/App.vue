<!-- 根组件 -->
<template>
  <div id="app">
    <!-- 这里 style 用内联样式，适合一次性，简单不重复的样式，这里正适合，不用写在下头 <style> 中 -->
    <el-container style="height: 100vh; border: 1px solid #eee;">
      <!-- 左侧边栏 -->
      <el-aside width="200px" style="background-color: #545c64;">
        <!-- 左侧边栏-菜单 -->
        <!-- :default-active="activeIndex" 表示默认高亮 index 等于 activeIndex 的菜单 -->
        <!-- router 表示开启路由模式，点击菜单会跳转到 index 的路由页面 -->
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b" router>
          <!-- 左侧边栏-菜单-首页 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <!-- 左侧边栏-菜单-学生管理 -->
          <!-- el-menu-item index 才是路由地址，而这里 index=1 不是，只是为了高亮显示 -->
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </template>
            <!-- 左侧边栏-菜单-学生管理-学生列表 -->
            <el-menu-item index="/student/list">学生列表</el-menu-item>
            <!-- 左侧边栏-菜单-学生管理-添加学生 -->
            <el-menu-item index="/student/add">添加学生</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主内容区域 -->
      <el-container>
        <!-- 主内容区域-顶部导航栏 -->
        <el-header style="text-align: right; font-size: 12px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;"></i>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 主内容区域-主要内容区域 -->
        <el-main>
          <!-- router-view 是 Vue 路由的占位符，用于渲染当前路由对应的组件 -->
          <!-- 
          点击菜单项时，Element UI 会读取该菜单项的 index 属性值，将 index 值作为路由路径，调用 $router.push() 方法执行路由跳转
          Vue Router 接收到跳转请求，找到对应的组件
          router-view 是 Vue Router 提供的 占位符组件，会自动显示当前路由对应的组件，不论 router-view 占位符在哪个组件中都会被更新
           -->
          <!-- 
           当没有 el-menu 做路由跳转联动时候，你可以采用下列方法，促使 <router-view> 更新
            方法1:
            this.$router.push()
            方法2:
            <router-link to="/student/list">
              <el-button>查看学生列表</el-button>
            </router-link>
            -->
          <!-- 因为访问的 http://localhost:8080/#/，访问的 '/'，所以其对应的路由组件就默认展示在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'App',
  /*
  写法一（简单写法）：
  data() { return { ... } }

  写法二（原始写法）：
  data: function() { return { ... } }
  */
  data() {
    return {
      activeIndex: '/'
    }
  },
  // 监听到
  watch: {
    // $route 是 Vue 内置属性，由于 Vue 中配置了 vue-router
    // 也可以写成 $route(newRoute, oldRoute)
    $route(to) {
      // 检查当前路由是否在学生管理子菜单下
      if (to.path.startsWith('/student/')) {
        this.activeIndex = '1' // 高亮展示 index="1" 的 menu
      } else {
        this.activeIndex = to.path
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 主内容区域-顶部导航栏 */
.el-header {
  background-color: #2c405f;
  color: #333;
  line-height: 60px;
}

/* 主内容区域-主要内容区域 */
.el-main {
  background-color: #f5f7fa;
  padding: 20px;
}

/* class 是 el-menu-vertical-demo 但是菜单没有折叠时 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
