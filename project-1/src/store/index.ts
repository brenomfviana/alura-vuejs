import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type IProject from "@/interfaces/IProject";
import { INotification } from "@/interfaces/INotification";
import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  DEFINE_PROJECTS,
  NOTIFY,
} from "./mutations";
import {
  GET_PROJECTS,
  REGISTER_PROJECT,
  CHANGE_PROJECT,
  REMOVE_PROJECT,
} from "./actions";
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
    [DELETE_PROJECT](state, projectId: string) {
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
    [GET_PROJECTS]({ commit }) {
      http
        .get("projects")
        .then((response) => commit(DEFINE_PROJECTS, response.data));
    },
    [REGISTER_PROJECT](context, projectName: string) {
      return http.post("/projects", {
        name: projectName,
      });
    },
    [CHANGE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [REMOVE_PROJECT]({ commit }, id: string) {
      return http.delete(`/projects/${id}`).then(() => {
        commit(DELETE_PROJECT, id);
      });
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
