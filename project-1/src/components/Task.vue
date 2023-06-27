<template>
  <Box>
    <div class="columns">
      <div class="column is-7">{{ task.description || "Sem descrição" }}</div>
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
});
</script>
