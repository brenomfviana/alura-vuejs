<template>
  <Form @onSaveTask="saveTask" />
  <div class="list">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Type to Search" v-model="filter" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @onTaskClicked="selectTask"
    />
    <div
      class="modal"
      :class="{ 'is-active': selectedTask }"
      v-if="selectedTask"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Task Editing</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="description" class="label">Description</label>
            <input
              type="text"
              class="input"
              v-model="selectedTask.description"
              id="description"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateTask">Save</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
    <Box v-if="!hasTasks"> You did not work today! </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import type ITask from "../interfaces/ITask";
import { useStore } from "@/store";
import {
  GET_PROJECTS,
  GET_TASKS,
  REGISTER_TASK,
  CHANGE_TASK,
} from "@/store/actions";
import Box from "../components/Box.vue";
import Form from "../components/Form.vue";
import Task from "../components/Task.vue";

export default defineComponent({
  name: "TasksView",
  components: {
    Box,
    Form,
    Task,
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const selectedTask = ref();

    const filter = ref("");

    // Search substring
    // const tasks = computed(() =>
    //   store.state.task.tasks.filter(
    //     t => !filter.value || t.description.includes(filter.value)
    //   )
    // );
    // Search by requesting the exact string

    const tasks = computed(() => store.state.task.tasks);
    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value);
    });

    const hasTasks = (): boolean => {
      return tasks.value.length > 0;
    };

    const closeModal = () => {
      selectedTask.value = null;
    };

    const saveTask = (task: ITask) => {
      task.id = new Date().toISOString();
      store.dispatch(REGISTER_TASK, task);
    };
    const updateTask = () => {
      store.dispatch(CHANGE_TASK, selectedTask.value).then(() => closeModal());
    };
    const selectTask = (task: ITask) => {
      selectedTask.value = task;
    };

    return {
      selectedTask,
      tasks,
      filter,
      hasTasks,
      saveTask,
      updateTask,
      selectTask,
      closeModal,
    };
  },
});
</script>

<style scoped>
.list {
  padding: 1.25rem;
}
</style>
