import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations";

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
