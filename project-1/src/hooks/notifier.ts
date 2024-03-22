import { NotificationType } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/mutations";
import { store } from "@/store";

type Notifier = {
  notify: (ntype: NotificationType, title: string, text: string) => void;
}

export default () : Notifier => {
  const notify = (ntype: NotificationType, title: string, text: string): void => {
    store.commit(NOTIFY, {
      title,
      text,
      ntype
    });
  };
  return {
    notify
  };
}
