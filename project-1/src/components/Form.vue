<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="New task form">
        <input
          type="text"
          class="input"
          placeholder="Which task do you want to start?"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>{{ elapsedTime }}</strong>
          </section>
          <button class="button" @click="start">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="finish">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Form",
  data() {
    return {
      timeInSeconds: 0,
      chronometer: 0,
    };
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000)
        .toISOString()
        .substring(11, 11 + 8);
    },
  },
  methods: {
    start() {
      this.chronometer = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
      console.log("starting...");
    },
    finish() {
      clearInterval(this.chronometer);
      console.log("finishing...");
    },
  },
});
</script>
