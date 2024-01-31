<template>
  <div class="notifications">
    <article
      class="message"
      :class="context[notification.ntype]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">
        {{ notification.title }}
      </div>
      <div class="message-body">
        {{ notification.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "Notifications",
  data() {
    return {
      context: {
        [NotificationType.SUCCESS]: "is-success",
        [NotificationType.WARNING]: "is-warning",
        [NotificationType.FAIL]: "is-danger",
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
}
</style>
