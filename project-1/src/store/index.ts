import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type IProject from "@/interfaces/IProject";
import { INotification } from "@/interfaces/INotification";
import { ADD_PROJECT, EDIT_PROJECT, REMOVE_PROJECT, DEFINE_PROJECTS, NOTIFY } from "./mutations";
import { GET_PROJECTS } from "./actions";
import http from "@/http";

interface State {
  projects: IProject[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id);
      state.projects[index] = project;
    },
    [REMOVE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter((proj) => proj.id != projectId);
    },
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
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
  actions: {
    [GET_PROJECTS] ({ commit }) {
      http.get("projects")
        .then(response => commit(DEFINE_PROJECTS, response.data))
    }
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
