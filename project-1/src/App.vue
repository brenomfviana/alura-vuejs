<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <Sidebar @onThemeChange="changeThemeMode" />
    </div>
    <div class="column is-three-quarter content">
      <Form @onSaveTask="saveTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <Box v-if="!hasTasks"> You did not work today! </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITask from "./interfaces/ITask";
import Box from "./components/Box.vue";
import Sidebar from "./components/Sidebar.vue";
import Form from "./components/Form.vue";
import Task from "./components/Task.vue";

export default defineComponent({
  name: "App",
  components: {
    Box,
    Sidebar,
    Form,
    Task,
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkMode: false,
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
    changeThemeMode(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style scoped>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2b42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
