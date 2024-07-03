import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { INotification } from "@/interfaces/INotification";
import { NOTIFY } from "./mutations";
import { project, ProjectState } from "./models/project";
import { task, TaskState } from "./models/task";

interface State {
  project: ProjectState;
  task: TaskState;
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    },
    notifications: [],
  },
  mutations: {
    [NOTIFY](state, newNotification: INotification) {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification) => notification.id! - newNotification.id
        );
      }, 3000);
    },
  },
  modules: {
    project,
    task,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
