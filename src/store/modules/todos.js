// import axios from "axios";
import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    commit("setTodos", response);
  },
  async addTodo({ commit }, title) {
    const response = await axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => {
        //Hack to solve jsonplaceholder API repeated ids
        const data = res.data;
        data.id = data.id * Math.floor(Math.random() * 1000);

        commit("newTodo", data);
      })
      .catch((err) => console.log(err));
  },
  async updateTodo({ commit }, updTodo) {
    await axios
      .put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
      .then((res) => commit("updateTodo", res.data))
      .catch((err) => console.log(err));
  },
  async deleteTodo({ commit }, id) {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => commit("removeTodo", id))
      .catch((err) => console.log(err));
  },
  async filterTodos({ commit }, event) {
    // Get selected amount
    const limit = event.target.value;
    await axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      .then((res) => commit("setTodos", res.data))
      .catch((err) => console.log(err));
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
