import type IProject from "./IProject";

export default interface ITask {
  id: number;
  durationInSeconds: number;
  description: string;
  project: IProject;
}
