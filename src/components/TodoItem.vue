<template>
  <transition appear
              enter-active-class="animate__bounceIn"
              leave-active-class="animate__bounceOut"
  >
    <li>
      <label>
        <input type="checkbox"
               :checked="item.done"
               @change="handleCheck(item.id)"/>
        <span v-show="!item.isEdit">{{ item.title }}</span>
        <input v-show="item.isEdit"
               type="text"
               :value="item.title"
               @blur="handleBlur(item, $event)"
               @keyup.enter="handleBlur(item, $event)"
               ref="inputTitle"
        >
      </label>

      <button class="btn btn-danger" @click="handleDelete(item.id)">删除</button>
      <button class="btn btn-edit" @click="handleEdit(item)">编辑</button>

    </li>
  </transition>
</template>

<script>
import 'animate.css'


export default {
  name: "TodoItem",
  //声明接收对象
  props: ['item'],
  methods: {
    handleCheck(id) {
      // this.checkItem(id);
      this.$bus.$emit('checkItem', id);
    },
    handleDelete(id) {
      if (confirm('确定删除吗?')) {
        // this.deleteItem(id);
        this.$bus.$emit('deleteItem', id);
      }
    },
    //编辑
    handleEdit(item) {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('isEdit')) {
        item.isEdit = true;
      } else {
        this.$set(item, 'isEdit', true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    //失去焦点回调(真正执行修改逻辑
    handleBlur(item, e) {
      item.isEdit = false;
      const title = e.target.value.trim();
      if (!title) return alert("输入不能为空!");
      this.$bus.$emit('updateItem', item.id, title);
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}

</style>