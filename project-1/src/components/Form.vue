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
import { computed, defineComponent, ref } from "vue";
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
  setup(props, { emit }) {
    const store = useStore();

    const description = ref("");
    const projectId = ref("");

    const projects = computed(() => store.state.project.projects);

    const markTaskAsDone = (elapsedTime: number): void => {
      const project = projects.value.find((p) => p.id == projectId.value);
      if (!project) {
        store.commit(NOTIFY, {
          title: "Ops!",
          text: "Select a project to finalize the task!",
          ntype: NotificationType.FAIL,
        });
        return;
      }
      emit("onSaveTask", {
        durationInSeconds: elapsedTime,
        description: description.value,
        project: project,
      });
      description.value = "";
    };

    return {
      description,
      projectId,
      projects,
      markTaskAsDone,
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
