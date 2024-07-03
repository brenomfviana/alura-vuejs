import http from "@/http";
import { Module } from "vuex";
import type IProject from "@/interfaces/IProject";
import { State } from "@store";
import {
  DEFINE_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
} from "@/store/mutations";
import {
  GET_PROJECTS,
  REGISTER_PROJECT,
  CHANGE_PROJECT,
  REMOVE_PROJECT,
} from "@/store/actions";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
  mutations: {
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
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
    [DELETE_PROJECT](state, projectId: number) {
      state.projects = state.projects.filter((p) => p.id != projectId);
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
    [REMOVE_PROJECT]({ commit }, id: number) {
      return http.delete(`/projects/${id}`).then(() => {
        commit(DELETE_PROJECT, id);
      });
    },
  },
};
