<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsView",
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
