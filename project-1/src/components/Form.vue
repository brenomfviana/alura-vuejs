<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="New task form">
        <input
          type="text"
          class="input"
          placeholder="Which task do you want to start?"
          v-model="description"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Select a Project</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Timer @onTimerEnd="markTaskAsDone" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { NotificationType } from "@/interfaces/INotification";
import { useStore } from "@/store";
import { NOTIFY } from "@/store/mutations";
import Timer from "./Timer.vue";

export default defineComponent({
  name: "Form",
  emits: ["onSaveTask"],
  components: {
    Timer,
  },
  data() {
    return {
      description: "",
      projectId: "",
    };
  },
  methods: {
    markTaskAsDone(elapsedTime: number): void {
      const project = this.projects.find((p) => p.id == this.projectId);
      if (!project) {
        this.store.commit(NOTIFY, {
          title: "Ops!",
          text: "Select a project to finalize the task!",
          ntype: NotificationType.FAIL,
        });
        return;
      }
      console.log(`Task time: ${elapsedTime}.`);
      console.log(`Task description: ${this.description}.`);
      this.$emit("onSaveTask", {
        durationInSeconds: elapsedTime,
        description: this.description,
        project: project,
      });
      this.description = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.project.projects),
    };
  },
});
</script>

<style>
.form {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
