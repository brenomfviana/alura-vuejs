<template>
  <Form @onSaveTask="saveTask" />
  <div class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <Box v-if="!hasTasks"> You did not work today! </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITask from "../interfaces/ITask";
import Box from "../components/Box.vue";
import Form from "../components/Form.vue";
import Task from "../components/Task.vue";

export default defineComponent({
  name: "App",
  components: {
    Box,
    Form,
    Task,
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    hasTasks(): boolean {
      return this.tasks.length > 0;
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task);
    },
  },
});
</script>

<style scoped>
.list {
  padding: 1.25rem;
}
</style>
