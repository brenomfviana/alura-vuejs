<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Chronometer :timeInSeconds="timeInSeconds" />
    <button class="button" @click="start" :disabled="isRunning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finish" :disabled="!isRunning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chronometer from "./Chronometer.vue";

export default defineComponent({
  name: "Timer",
  emits: ["onTimerFinishing"],
  components: {
    Chronometer,
  },
  data() {
    return {
      timeInSeconds: 0,
      chronometer: 0,
      isRunning: false,
    };
  },
  methods: {
    start() {
      console.log("starting...");
      this.isRunning = true;
      this.chronometer = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },
    finish() {
      console.log("finishing...");
      this.isRunning = false;
      clearInterval(this.chronometer);
      this.$emit("onTimerFinishing", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>
