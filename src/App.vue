<template>
  <div id="todo-app">
    <div class="todo-container">
      <div class="todo-wrap">
        <todo-header
            @addItem="addItem"/>
        <todo-list :todos="todos"/>
        <todo-footer
            :todos="todos"
            @checkAllItems="checkAllItems"
            @deleteAllDoneItems="deleteAllDoneItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader";
import TodoList from "@/components/TodoList";
import TodoFooter from "@/components/TodoFooter";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
    }
  },
  methods: {
    addItem(item) {
      this.todos.unshift(item);
    },
    checkItem(id) {
      this.todos.forEach((item) => {
        if (item.id === id) item.done = !item.done;
      });
    },
    deleteItem(id) {
      this.todos = this.todos.filter(item => item.id !== id);
    },
    checkAllItems(done) {
      this.todos.forEach((item) => {
        item.done = done;
      });
    },
    deleteAllDoneItems() {
      this.todos = this.todos.filter(item => !item.done);
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      }
    }
  },
  mounted() {
    this.$bus.$on('checkItem', this.checkItem);
    this.$bus.$on('deleteItem', this.deleteItem);

    this.$bus.$on('updateItem', (id, title) => {
      this.todos.forEach((item) => {
        if (item.id === id) item.title = title;
      })
    })
  },
  beforeDestroy() {
    this.$bus.$off('checkItem');
    this.$bus.$off('deleteItem');

    this.$bus.$off('updateItem');
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(103, 159, 180);
  margin-right: 5px;
}

.btn-edit:hover {
  color: #fff;
  background-color: rgb(103, 159, 180);
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>