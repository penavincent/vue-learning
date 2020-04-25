<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to Edit title</span>
      <span> <span class="incomplete-box" /> = Incomplete </span>
      <span> <span class="complete-box" /> = Complete </span>
    </div>
    <div class="todos">
      <div
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        :class="{ completed: todo.completed }"
      >
        {{ todo.title }}
        <font-awesome-icon
          class="check-icon"
          :icon="['fa', 'check']"
          @click="completeTodo(todo)"
        />
        <font-awesome-icon
          class="trash-icon"
          :icon="['fa', 'trash-alt']"
          @click="deleteTodo(todo.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos", "updateTodo", "deleteTodo"]),
    completeTodo(todo) {
      const updTodo = { ...todo, completed: !todo.completed };
      this.updateTodo(updTodo);
    },
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.completed {
  background: #35495e;
}

.check-icon {
  position: absolute;
  bottom: 10px;
  right: 35px;
  color: #fff;
  cursor: pointer;
}

.trash-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
