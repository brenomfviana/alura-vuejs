export enum NotificationType {
  SUCCESS,
  FAIL,
  WARNING,
}

export interface INotification {
  id: string;
  title: string;
  text: string;
  ntype: NotificationType;
}
