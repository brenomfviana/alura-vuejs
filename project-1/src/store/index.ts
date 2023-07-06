import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type IProject from "@/interfaces/IProject";

interface State {
  projects: IProject;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
  },
  mutations: {
    ADD_PROJECT(state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    EDIT_PROJECT(state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id);
      state.projects[index] = project;
    },
    REMOVE_PROJECT(state, projectId: string) {
      state.projects = state.projects.filter((proj) => proj.id != projectId);
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}