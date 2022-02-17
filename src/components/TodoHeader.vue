<template>
  <div class="todo-header">
    <input type="text"
           placeholder="请输入你的任务名称，按回车键确认"
           v-model.trim="title"
           @keyup.enter="add"/>
  </div>
</template>

<script>
export default {
  name: "TodoHeader",
  data() {
    return {
      title: '',
    }
  },
  methods: {
    add() {
      //检验数据
      if (!this.title) {
        this.title = '';
        return alert('输入不能为空!');
      }
      //创建对象
      const item = this.createTodoItem(this.title);
      //添加对象
      // this.addItem(item);
      this.$emit('addItem', item);
      //清空数据
      this.title = '';
    }
  },
  // props: ['addItem'],
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>