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
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";
import { REGISTER_PROJECT, CHANGE_PROJECT } from "@/store/actions";

export default defineComponent({
  name: "FormView",
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (p) => p.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save() {
      if (this.id) {
        this.store
          .dispatch(CHANGE_PROJECT, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => this.process());
      } else {
        this.store
          .dispatch(REGISTER_PROJECT, this.projectName)
          .then(() => this.process());
      }
    },
    process() {
      this.projectName = "";
      this.notify(
        NotificationType.SUCCESS,
        "Your project was save!",
        "Done :) Your project is available!"
      );
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
