import { NotificationType } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/mutations";
import { store } from "@/store";

export const notificationMixin = {
  methods: {
    notify(ntype: NotificationType, title: string, text: string) {
      store.commit(NOTIFY, {
        title,
        text,
        ntype,
      });
    },
  },
};
