<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label">Project Name</label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Save</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { NotificationType } from "@/interfaces/INotification";
import { useStore } from "@/store";
import { REGISTER_PROJECT, CHANGE_PROJECT } from "@/store/actions";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "FormView",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotifier();

    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (p) => p.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const process = () => {
      projectName.value = "";
      notify(
        NotificationType.SUCCESS,
        "Your project was save!",
        "Done :) Your project is available!"
      );
      router.push("/projects");
    };

    const save = () => {
      if (props.id) {
        store
          .dispatch(CHANGE_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => process());
      } else {
        store
          .dispatch(REGISTER_PROJECT, projectName.value)
          .then(() => process());
      }
    };

    return {
      projectName,
      save,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
