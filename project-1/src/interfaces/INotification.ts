export enum NotificationType {
  SUCCESS,
  FAIL,
  WARNING,
}

export interface INotification {
  title: string;
  text: string;
  ntype: NotificationType;
  id: number;
}
