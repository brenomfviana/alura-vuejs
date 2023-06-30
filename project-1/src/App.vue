<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <Sidebar @onThemeChange="changeThemeMode" />
    </div>
    <div class="column is-three-quarter content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./components/Sidebar.vue";

export default defineComponent({
  name: "App",
  components: {
    Sidebar,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    changeThemeMode(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style scoped>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2b42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
