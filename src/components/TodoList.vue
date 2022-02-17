<template>
  <transition appear
              enter-active-class="animate__bounceIn"
              leave-active-class="animate__bounceOut"
  >
    <ul class="todo-main">
        <todo-item v-for="item in todos"
                   :key="item.id"
                   :item="item"
        />
    </ul>
  </transition>

</template>

<script>
import 'animate.css'
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: ['todos'],
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>