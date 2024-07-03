import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations";

type Notifier = {
  notify: (ntype: NotificationType, title: string, text: string) => void;
};

export default (): Notifier => {
  const notify = (
    ntype: NotificationType,
    title: string,
    text: string
  ): void => {
    store.commit(NOTIFY, {
      title,
      text,
      ntype,
    });
  };
  return {
    notify,
  };
};
