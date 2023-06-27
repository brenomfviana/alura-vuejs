<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="New task form">
        <input
          type="text"
          class="input"
          placeholder="Which task do you want to start?"
          v-model="description"
        />
      </div>
      <div class="column">
        <Timer @onTimerFinishing="markTaskAsDone" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timer from "./Timer.vue";

export default defineComponent({
  name: "Form",
  components: {
    Timer,
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    markTaskAsDone(elapsedTime: number): void {
      console.log(`Task time: ${elapsedTime}.`);
      console.log(`Task description: ${this.description}.`);
    },
  },
});
</script>
