<!-- 学生信息表单组件 -->
<template>
  <!-- :model，:rules 有 ":" 是因为他们是 v-bind= 的简写，表示把某个数据动态绑定上去 -->
  <!-- ref 没有 ":" 表示绑定的是一个静态字符串，比如这里 "studentForm" 就是一个纯文本，就是一个定位具体哪个表单的一个 string 代号，而不表示一个对象或者一个数据 -->
  <el-form :model="localForm" :rules="rules" ref="studentForm" label-width="80px">
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
  name: 'StudentForm',
  // 用于接收名为 studentForm 对象类型的属性
  props: {
    studentForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localForm: { ...this.studentForm }, // 浅拷贝
      // form 校验规则
      rules: {
        // name
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // age
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === null || value === '') {
                callback(new Error('请输入年龄'))
              } else if (isNaN(value)) {
                callback(new Error('年龄必须为数字'))
              } else if (value < 1) {
                callback(new Error('年龄必须为正整数'))
              } else if (!Number.isInteger(Number(value))) {
                callback(new Error('年龄必须为整数'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        // grade
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ]
      }
    }
  },
  // 监听数据变化
  watch: {
    // 监听外部传递过来的 studentForm 数据的变化
    studentForm: {
      // 监听到有变化时执行的函数，固定写法。newValue 是变化后的值
      handler(newValue) {
        this.localForm = { ...newValue }
      },
      // 是否深度监听，固定写法。当 studentForm 是对象时，deep：true 表示会监听对象内部属性的变化
      deep: true
    }
  },
  methods: {
    submitForm() {
      // $refs 是 Vue 实例的内置属性，用于访问组件或 DOM 元素
      // $refs.studentForm ：通过 ref="studentForm" 获取到的表单实例。ref="studentForm" 中只是起了 studentForm 这个名字而已，恰好和外部传过来的 studentForm 名字一样而已
      // 表示校验此表单是否符合校验规则，固定写法。这个 validate() 函数做的本质就是对 rules 做了校验。因此你常常看到，form 中 ref 和 :rule 都有，ref 用来找到具体某个表单，进行定位表单，然后定位到表单后表单中存在 :rule 才能进行 validate() 校验
      this.$refs.studentForm.validate((valid) => {
        if (valid) {
          // 准备提交的数据
          const formData = {
            ...this.localForm,
            age: Number(this.localForm.age) // 确保年龄是数字类型，这里对 age 做了覆盖
          }
          // $emit 本质做的事情就是 1.触发外部组件的 submit 事件执行，2.同时在外部 submit 的方法执行时候传递参数 formData
          this.$emit('submit', formData)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$emit('reset')
    }
  }
}
</script>
