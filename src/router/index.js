import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StudentList from '../views/StudentList.vue'
import AddStudent from '../views/AddStudent.vue'
import EditStudent from '../views/EditStudent.vue'

// 注册 Vue 路由插件 Router
/*
本质是向 Vue：
1. 注册 Router 全局组件（如 <router-view> 、 <router-link> ）
2. 向 Vue 实例添加 $router 和 $route 属性
3. 实现路由的核心功能
为了让 Vue 框架能够识别和处理路由功能，没有 use ，Vue 不认识路由
*/
// 该文件被 import 到 main.js 中，所以会被先执行，然后 main.js 中最后会 new Vue
Vue.use(Router)

/*
上方 use(Router) 的 Router 传入的 Router 构造函数(类)
这里的 new Router 则创造了 router 实例

main.js 中 Vue 实例化填充了这个 router 之后，未来通过：
- <router-view> 组件来显示当前路由对应的组件
- <router-link> 组件来创建导航链接
- this.$router 来进行编程式导航（$ 表示注入的属性）
- this.$route 来获取当前路由信息（$ 表示注入的属性）
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/student/list',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/student/add',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/student/edit/:id',
      name: 'EditStudent',
      component: EditStudent
    }
  ]
})
