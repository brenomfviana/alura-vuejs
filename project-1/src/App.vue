<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <Sidebar />
    </div>
    <div class="column is-three-quarter">
      <Form />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Form from "./components/Form.vue";

export default defineComponent({
  name: "App",
  components: {
    Sidebar,
    Form,
  },
});
</script>

<style scoped></style>
