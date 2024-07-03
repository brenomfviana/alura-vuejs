export enum NotificationType {
  SUCCESS,
  FAIL,
  WARNING,
}

export interface INotification {
  id: number;
  title: string;
  text: string;
  ntype: NotificationType;
}
