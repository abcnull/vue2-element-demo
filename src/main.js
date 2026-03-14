import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'

/*
1. 配置 ElementUI：Vue.use(ElementUI)
2. 配置 axios：Vue.prototype.$axios = axios
3. 关闭生产环境下的提示：Vue.config.productionTip = false
4. 配置路由：router
5. 创建 App 实例，挂在到 id = app 的元素上：render
*/

// 使用 ElementUI
Vue.use(ElementUI)
// 配置 axios,
// 表示将 axios 添加为 Vue 实例的一个内置方法，这样所有组件实例都可以通过 this.$axios 访问它
// prototype 上的，原型属性，被所有实例继承，每个实例都可以访问到
Vue.prototype.$axios = axios

// 模拟后端接口
const mockStudents = [
  { id: 1, name: '张三', age: 12, gender: '男', grade: '一年级' },
  { id: 2, name: '李四', age: 13, gender: '女', grade: '二年级' },
  { id: 3, name: '王五', age: 12, gender: '男', grade: '一年级' },
  { id: 4, name: '赵六', age: 14, gender: '女', grade: '三年级' }
]

// 拦截axios响应，模拟后端响应
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 模拟后端响应，error.config 包含了发送请求的所有配置信息
    const config = error.config

    // 模拟GET请求
    if (config.method === 'get' && config.url === '/api/students') {
      /*
        Promise 是处理异步操作的对象。为了避免回调地狱产生了 Promise
        axios 的请求是异步的，调用方（如 this.$axios.get('/api/students') ）期望得到一个 Promise 对象。
        const promise = new Promise((resolve, reject) => {
          // 异步操作
          if (操作成功) {
            resolve(结果);
          } else {
            reject(错误);
          }
        });

        promise.then(结果 => {...成功}).catch(错误 => {...失败});
      */
      return new Promise(resolve => {
        // setTimeout 异步操作。结果立马返回，setTimeout 其中仍在执行
        setTimeout(() => {
          resolve({ data: mockStudents })
        }, 300)
      })
    }
    // 模拟GET单个学生
    if (config.method === 'get' && config.url.match(/\/api\/students\/\d+/)) { // 正则表达式
      // parseInt 全局函数，无 import 直接可用
      // pop 数组的方法，移除并返回数组中最后一个元素
      const id = parseInt(config.url.split('/').pop())
      const student = mockStudents.find(s => s.id === id)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: student })
        }, 300)
      })
    }
    // 模拟POST请求
    if (config.method === 'post' && config.url === '/api/students') {
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
    if (config.method === 'put' && config.url.match(/\/api\/students\/\d+/)) {
      const id = parseInt(config.url.split('/').pop())
      // findIndex 入参是一个回掉函数。这里遍历找到第一个符合条件的元素的索引，没找到返回 -1
      const index = mockStudents.findIndex(s => s.id === id)
      if (index !== -1) {
        mockStudents[index] = {
          // ... 对象展开
          ...mockStudents[index],
          ...config.data
        }
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: mockStudents[index] })
        }, 300)
      })
    }
    // 模拟DELETE请求
    if (config.method === 'delete' && config.url.match(/\/api\/students\/\d+/)) {
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
    /*
    等同：
    return new Promise(reject => {
      reject(error);
    });
    将 error 作为拒绝的原因传递给后续的 .catch() 或 try/catch
    */
    return Promise.reject(error)
  }
)

// 关闭生产环境下的提示
// 静态属性，访问（例如 Vue.config ）
Vue.config.productionTip = false

/*
$ 是实例属性，往往通过 this.$xxx 来访问，为了避免和实例中自己定义出来的属性冲突
不带 $ 则是静态的属性，所有的实例都可以访问了
*/

// 创建 vue 实例，指定使用 App 组件作为根组件
// 并找到 public 下的 index.html 中，将其挂载到 id 为 app 的元素上
new Vue({
  router, // 配置路由
  render: h => h(App), // 创建 vue 实例，指定使用 App 组件作为根组件，h 是 createElement 函数的别名
}).$mount('#app') // 将 Vue 这个根组件实例挂载到 id 为 app
