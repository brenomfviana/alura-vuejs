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
import { ADD_PROJECT, EDIT_PROJECT, NOTIFY } from "@/store/mutations";

export default defineComponent({
  name: "FormView",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (proj) => proj.id == this.id
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
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        console.log(this.store);
        this.store.commit(ADD_PROJECT, this.projectName);
      }
      this.projectName = "";
      this.store.commit(NOTIFY, {
        title: "Your project was save!",
        text: "Done :) Your project is available!",
        ntype: NotificationType.SUCCESS,
      });
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
