<template>
  <transition appear
              enter-active-class="animate__bounceIn"
              leave-active-class="animate__bounceOut"
  >
    <div class="todo-footer" v-show="total">
      <label>
        <input type="checkbox" v-model="isAll"/>
      </label>
      <span>
          <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
        </span>
      <button class="btn btn-danger" @click="deleteAllDone">清除已完成任务</button>
    </div>
  </transition>
</template>

<script>
import 'animate.css'

export default {
  name: "TodoFooter",
  props: ['todos'],
  methods: {
    deleteAllDone() {
      if (confirm('是否删除所有已完成任务?')) {
        // this.deleteAllDoneItems();
        this.$emit('deleteAllDoneItems');
      }
    }
  },
  computed: {
    total() {
      return this.todos.length;
    },
    doneTotal() {
      return this.todos.reduce((pre, current) => {
        return pre + current.done;
      }, 0)
    },
    isAll: {
      get() {
        return this.doneTotal === this.total && this.total > 0;
      },
      set(value) {
        // this.checkAllItems(value);
        this.$emit('checkAllItems', value);
      }
    },
  }
}
</script>

<style scoped>


/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>