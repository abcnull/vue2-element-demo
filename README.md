# Vue 2 学生管理系统项目教程

## 项目介绍

这是一个基于 Vue 2 和 Element UI 的学生管理系统前端项目，旨在帮助 Vue 2 初学者快速上手 Vue 2 及其相关生态系统。项目包含了学生管理的基本功能，如添加、编辑、删除和查询学生信息。

## 技术栈

- **Vue 2.6.14**：前端框架
- **Element UI 2.15.13**：UI 组件库
- **Vue Router 3.5.3**：路由管理
- **Axios 1.6.8**：HTTP 请求库

## 项目结构

```
vue2-element-demo/
├── public/           # 静态资源目录
│   ├── favicon.ico   # 网站图标
│   └── index.html    # HTML 模板文件
├── src/              # 源代码目录
│   ├── assets/       # 静态资源
│   │   └── logo.png  # 项目 logo
│   ├── components/   # 组件目录
│   │   ├── HelloWorld.vue  # 示例组件
│   │   └── StudentForm.vue # 学生表单组件
│   ├── router/       # 路由配置
│   │   └── index.js  # 路由定义
│   ├── views/        # 页面视图
│   │   ├── HomePage.vue     # 首页
│   │   ├── StudentList.vue  # 学生列表
│   │   ├── AddStudent.vue   # 添加学生
│   │   └── EditStudent.vue  # 编辑学生
│   ├── App.vue       # 根组件
│   └── main.js       # 入口文件
├── .gitignore        # Git 忽略文件
├── README.md         # 项目说明
├── babel.config.js   # Babel 配置
├── jsconfig.json     # JavaScript 配置
├── package-lock.json # 依赖版本锁定
├── package.json      # 项目配置和依赖
└── vue.config.js     # Vue CLI 配置
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run serve
```

项目将运行在 http://localhost:8081/

## 整体说明

### 入口文件

`public/index.html` 是项目的入口文件，声明了 id='app', 它作为挂载点，Vue 实例会挂载到这个文件中的 `#app` 元素上。

`router/index.js` 路由配置文件，定义了项目的路由规则，包括路径、组件、名称等。最终被 import 进去 main.js 中，作为 Vue 实例的配置项。

`src/main.js` 主逻辑，主要负责配置 Vue 实例、注册组件、配置路由和创建 Vue 实例，指定 Vue 实例的根组件，并将 Vue 实例（带着根组件）挂载到 `public/index.html` 中的 `#app` 元素上。这里做到了把路由和组件关联起来的事情，所以代码只要访问了某个路由，就能触发对应的组件在占位处展现出来

`src/App.vue` 根组件，描述了整个 index.html 页面整体的结构，包括 menu 引导到哪个路由页面

### 路由组件

`views/HomePage.vue` 首页组件，显示系统欢迎信息和进入学生列表的入口。路由是 '/'，所以访问 '/' 时，会在`<router-view></router-view>`占位处渲染这个组件。

`views/StudentList.vue` 展示查询学生信息的能力，以及列表展示数据。 `router/index.js` 中定义了某个路由和这个组件的关联，当 App.vue 根组件中随着点击 menu，menu 会触发进行路由跳转，跳转到指定的路由本质对应着该路由关联的组件在 App.vue 中的占位点 `<router-view></router-view>` 处占位展示

`views/EditStudent.vue` 展示的是编辑学生信息的能力，以及提交更新的能力。在 StudentList.vue 学生列表组件中的 table 点击具体某一行学生数据，触发点击事件中的 `` this.$router.push(`/student/edit/${id}`) `` 逻辑执行，把学生的 id 作为路由尾部 id，跳转到 EditStudent.vue 路由页面，其中 mounted 时候通过学生 id 用 axios 去查询了学生数据展现在表单页面上。然后整个表单中的

`views/AddStudent.vue` 其实和 `views/EditStudent.vue` 非常类似，这里不赘述

### 功能复用组件

`components/StudentForm.vue` 这里是一个可以复用的学生信息 form 组件，可以被 `views/EditStudent.vue` 路由页面和 `views/AddStudent.vue` 路由页面所复用。

```
views/EditStudent.vue
└── components/StudentForm.vue

views/AddStudent.vue
└── components/StudentForm.vue
```

从 EditStudent.vue/AddStudent.vue 外部传递数据到 StudentForm.vue 子组件中：

- 一：EditStudent.vue 组件使用子组件 StudentForm.vue

```html
<student-form></student-form>
```

- 二：EditStudent.vue 往子组件 StudentForm.vue 中传递数据。如下的 studentForm 是 EditStudent.vue 中自己定义的数据

```html
<student-form :student-form="studentForm"></student-form>
```

- 三：StudentForm.vue 中承接父组件传过来的数据，并可以在 data(){} 中直接使用了

```javascript
<script>
export default {
    // 其他数据
    props: {
        studentForm: {
        type: Object,
        default: () => ({})
        }
    }
    // 其他数据
}
</script>
```

从子组件 StudentForm.vue 将内部数据传递到父组件 EditStudent.vue 中：

- 一：EditStudent.vue 组件使用子组件 StudentForm.vue

```html
<student-form></student-form>
```

- 二：子组件 StudentForm.vue 中通过表单事件触发函数执行，然后函数中存在 emit 操作来专门触发父组件 EditStudent.vue 事件的执行，同时绑上一个数据带给父组件 EditStudent.vue

```javascript
// 子组件内部代码
methods: {
    // 子组件中表单的 submit 动作触发此函数执行
    submitForm() {
        // 其他数据

        // emit 执行，触发父组件的 submit 事件执行，同时把子组件的 studentForm 数据传过去
        // 即父组件会执行父组件自己的 submit 的方法，并且把子组件的传过去的 studentForm 作为方法入参
        this.$emit("submit", this.studentForm);
    }
}
```

- 三：父组件 EditStudent.vue 的 submit 事件被触发，并带上子组件 StudentForm.vue 传递过来的 studentForm 数据

```javascript
<template>
    <!-- 其他数据 -->
    <student-form @submit="submitForm"></student-form>
    <!-- 其他数据 -->
</template>

<script>
export default {
    // 其他数据
    methods: {
        // 父组件 EditStudent.vue 中 submit 事件触发此函数执行
        // studentForm 为子组件 StudentForm.vue 传递过来的数据
        submitForm(studentForm) {
            // 其他数据

            // 处理子组件 StudentForm.vue 传递过来的 studentForm 数据
            console.log(studentForm);
        }
    }
    // 其他数据
}
</script>
```

## 功能说明

### 1. 首页

- 显示系统欢迎信息
- 提供进入学生列表的入口

### 2. 学生列表

- 显示所有学生信息
- 支持按姓名、性别、年级进行查询
- 支持重置查询条件
- 提供添加学生的入口
- 支持编辑和删除学生
- 删除操作有确认对话框，点击取消不会报错

### 3. 添加学生

- 填写学生基本信息（姓名、年龄、性别、年级）
- 年龄验证：必须为正整数
- 表单提交后自动跳转到学生列表

### 4. 编辑学生

- 显示学生当前信息
- 修改后提交更新
- 取消编辑可返回学生列表

## 核心代码解析

### 1. 入口文件 (main.js)

```javascript
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import axios from "axios";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

// 模拟后端接口
const mockStudents = [
  { id: 1, name: "张三", age: 12, gender: "男", grade: "一年级" },
  { id: 2, name: "李四", age: 13, gender: "女", grade: "二年级" },
  { id: 3, name: "王五", age: 12, gender: "男", grade: "一年级" },
  { id: 4, name: "赵六", age: 14, gender: "女", grade: "三年级" },
];

// 拦截axios响应，模拟后端响应
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 模拟后端响应
    const config = error.config;

    // 模拟GET请求
    if (config.method === "get" && config.url === "/api/students") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockStudents });
        }, 300);
      });
    }
    // 模拟POST请求
    if (config.method === "post" && config.url === "/api/students") {
      // 解析 config.data 为对象
      const studentData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      const newStudent = {
        id: mockStudents.length + 1,
        // ... 为 js 的展开运算符，展开数组或对象。这里展开了对象
        ...studentData
      }
      mockStudents.push(newStudent)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: newStudent })
        }, 300)
      })
    }
    // 模拟PUT请求
    if (config.method === "put" && config.url.match(/\/api\/students\/\d+/)) {
      const id = parseInt(config.url.split('/').pop())
      // 解析 config.data 为对象
      const studentData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      const index = mockStudents.findIndex(s => s.id === id)
      if (index !== -1) {
        mockStudents[index] = {
          // ... 对象展开
          ...mockStudents[index],
          ...studentData
        }
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: mockStudents[index] })
        }, 300)
      })
    }
    // 模拟DELETE请求
    if (config.method === "delete" && config.url.match(/\/api\/students\/\d+/)) {
      const id = parseInt(config.url.split('/').pop())
      const index = mockStudents.findIndex(s => s.id === id)
      if (index !== -1) {
        // 会改变原数组内容，原数组直接被修改
        mockStudents.splice(index, 1)
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: { success: true } })
        }, 300)
      })
    }
    // 其他请求处理...

    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

**解析**：

- 导入并注册 Vue、Element UI、Vue Router 和 Axios
- 配置 axios 拦截器，模拟后端接口响应
- 为 POST 和 PUT 请求添加数据类型解析，确保正确处理字符串格式的请求数据
- 为 DELETE 请求添加完整的处理逻辑
- 创建 Vue 实例，挂载到 #app 元素

### 2. 路由配置 (router/index.js)

```javascript
import Vue from "vue";
import Router from "vue-router";
import HomePage from "../views/HomePage.vue";
import StudentList from "../views/StudentList.vue";
import AddStudent from "../views/AddStudent.vue";
import EditStudent from "../views/EditStudent.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/student/list",
      name: "StudentList",
      component: StudentList,
    },
    {
      path: "/student/add",
      name: "AddStudent",
      component: AddStudent,
    },
    {
      path: "/student/edit/:id",
      name: "EditStudent",
      component: EditStudent,
    },
  ],
});
```

**解析**：

- 导入路由组件
- 定义路由配置，包括首页、学生列表、添加学生和编辑学生

### 3. 根组件 (App.vue)

```vue
<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: #545c64;">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item index="/student/list">学生列表</el-menu-item>
            <el-menu-item index="/student/add">添加学生</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;"></i>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/",
    };
  },
  watch: {
    $route(to) {
      // 检查当前路由是否在学生管理子菜单下
      if (to.path.startsWith("/student/")) {
        this.activeIndex = "1";
      } else {
        this.activeIndex = to.path;
      }
    },
  },
};
</script>
```

**解析**：

- 使用 Element UI 的容器组件创建布局
- 左侧为导航菜单，右侧为内容区域
- 使用 router-view 显示当前路由对应的组件
- 监听路由变化，动态设置菜单激活状态

### 4. 学生表单组件 (components/StudentForm.vue)

```vue
<template>
  <el-form
    :model="localForm"
    :rules="rules"
    ref="studentForm"
    label-width="80px"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="localForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input type="number" v-model="localForm.age"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="localForm.gender">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年级" prop="grade">
      <el-select v-model="localForm.grade" placeholder="请选择年级">
        <el-option label="一年级" value="一年级"></el-option>
        <el-option label="二年级" value="二年级"></el-option>
        <el-option label="三年级" value="三年级"></el-option>
        <el-option label="四年级" value="四年级"></el-option>
        <el-option label="五年级" value="五年级"></el-option>
        <el-option label="六年级" value="六年级"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button @click="$emit('cancel')">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "StudentForm",
  props: {
    studentForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localForm: { ...this.studentForm },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === null || value === "") {
                callback(new Error("请输入年龄"));
              } else if (isNaN(value)) {
                callback(new Error("年龄必须为数字"));
              } else if (value < 1) {
                callback(new Error("年龄必须为正整数"));
              } else if (!Number.isInteger(Number(value))) {
                callback(new Error("年龄必须为整数"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        grade: [{ required: true, message: "请选择年级", trigger: "change" }],
      },
    };
  },
  watch: {
    studentForm: {
      handler(newValue) {
        this.localForm = { ...newValue };
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.$refs.studentForm.validate((valid) => {
        if (valid) {
          // 准备提交的数据
          const formData = {
            ...this.localForm,
            age: Number(this.localForm.age), // 确保年龄是数字类型
          };
          this.$emit("submit", formData);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$emit("reset");
    },
  },
};
</script>
```

**解析**：

- 复用的学生表单组件，用于添加和编辑学生
- 接收 studentForm 作为 props
- 使用本地副本 localForm 避免直接修改 props
- 实现表单验证，特别是年龄的验证
- 通过事件向父组件传递表单数据

### 5. 学生列表组件 (views/StudentList.vue)

```vue
<template>
  <div class="student-list">
    <el-card>
      <div class="card-header">
        <h2>学生列表</h2>
        <el-button type="primary" @click="$router.push('/student/add')"
          >添加学生</el-button
        >
      </div>
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入姓名"
          ></el-input>
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
      <el-table :data="studentList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
        ></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editStudent(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteStudent(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentList",
  data() {
    return {
      searchForm: {
        name: "",
        gender: "",
        grade: "",
      },
      studentList: [],
      originalList: [],
    };
  },
  mounted() {
    this.getStudentList();
  },
  watch: {
    $route() {
      // 当路由变化时，重新获取学生列表
      this.getStudentList();
    },
  },
  methods: {
    getStudentList() {
      // 模拟请求后端接口
      axios.get("/api/students").then((response) => {
        this.studentList = response.data;
        this.originalList = response.data;
      });
    },
    search() {
      // 模拟搜索功能
      let filteredList = [...this.originalList];

      if (this.searchForm.name) {
        filteredList = filteredList.filter((student) =>
          student.name.includes(this.searchForm.name)
        );
      }

      if (this.searchForm.gender) {
        filteredList = filteredList.filter(
          (student) => student.gender === this.searchForm.gender
        );
      }

      if (this.searchForm.grade) {
        filteredList = filteredList.filter(
          (student) => student.grade === this.searchForm.grade
        );
      }

      this.studentList = filteredList;
    },
    resetSearch() {
      // 重置搜索表单
      this.searchForm = {
        name: "",
        gender: "",
        grade: "",
      };
      // 重新获取学生列表
      this.getStudentList();
    },
    editStudent(id) {
      this.$router.push(`/student/edit/${id}`);
    },
    deleteStudent(id) {
      this.$confirm("确定要删除这个学生吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 模拟删除请求
        axios.delete(`/api/students/${id}`).then(() => {
          this.$message.success("删除成功");
          this.getStudentList();
        });
      }).catch(() => {
        // 处理取消操作
      });
    },
  },
};
</script>
```

**解析**：

- 显示学生列表，支持分页和排序
- 提供搜索功能，可按姓名、性别、年级查询
- 支持编辑和删除学生
- 监听路由变化，当从其他页面返回时重新获取数据

## 学习要点

### 1. Vue 2 基础

- **组件化开发**：将页面拆分为可复用的组件
- **数据绑定**：使用 v-model 实现双向数据绑定
- **计算属性和监听器**：使用 computed 和 watch 处理数据逻辑
- **生命周期钩子**：使用 mounted 等钩子函数处理组件生命周期

### 2. Element UI 使用

- **表单组件**：使用 el-form、el-input、el-select 等组件构建表单
- **表格组件**：使用 el-table 显示数据列表
- **容器组件**：使用 el-container、el-aside、el-main 构建布局
- **对话框和消息**：使用 el-dialog、el-message 等组件

### 3. Vue Router

- **路由配置**：定义路由路径和对应的组件
- **路由导航**：使用 this.$router.push() 进行页面跳转
- **动态路由**：使用 :id 传递参数

### 4. Axios

- **HTTP 请求**：使用 axios.get()、axios.post() 等方法发送请求
- **拦截器**：使用 axios.interceptors 处理请求和响应
- **Promise**：使用 Promise 处理异步操作

### 5. 模拟后端

- **数据模拟**：使用数组存储模拟数据
- **接口模拟**：使用 axios 拦截器模拟后端响应
- **CRUD 操作**：实现增删改查功能

## 总结

本项目是一个基于 Vue 2 和 Element UI 的学生管理系统，包含了基本的 CRUD 功能，适合 Vue 2 初学者学习。通过学习本项目，你可以掌握：

1. Vue 2 的基本语法和组件化开发
2. Element UI 的使用方法
3. Vue Router 的配置和使用
4. Axios 的使用和拦截器配置
5. 模拟后端接口的方法

希望本教程能帮助你快速上手 Vue 2 开发！
