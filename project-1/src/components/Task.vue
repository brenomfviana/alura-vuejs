<template>
  <Box>
    <div class="columns clickable" @click="clickTask">
      <div class="column is-7">{{ task.description || "No Description" }}</div>
      <div class="column is-3">
        {{ task.project?.name || "Not Defined" }}
      </div>
      <div class="column">
        <Chronometer :timeInSeconds="task.durationInSeconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type ITask from "@/interfaces/ITask";
import Box from "./Box.vue";
import Chronometer from "./Chronometer.vue";

export default defineComponent({
  name: "Task",
  emits: ["onTaskClicked"],
  components: {
    Box,
    Chronometer,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    clickTask(): void {
      this.$emit("onTaskClicked", this.task);
    },
  },
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
