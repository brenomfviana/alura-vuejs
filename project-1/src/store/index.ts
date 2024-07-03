import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type IProject from "@/interfaces/IProject";
import { INotification } from "@/interfaces/INotification";
import {
  DEFINE_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  DEFINE_TASKS,
  ADD_TASK,
  EDIT_TASK,
  NOTIFY,
} from "./mutations";
import {
  GET_PROJECTS,
  REGISTER_PROJECT,
  CHANGE_PROJECT,
  REMOVE_PROJECT,
  GET_TASKS,
  REGISTER_TASK,
  CHANGE_TASK,
} from "./actions";
import http from "@/http";
import type ITask from "@/interfaces/ITask";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
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
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t) => t.id == task.id);
      state.tasks[index] = task;
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
    [REMOVE_PROJECT]({ commit }, id: number) {
      return http.delete(`/projects/${id}`).then(() => {
        commit(DELETE_PROJECT, id);
      });
    },
    [GET_TASKS]({ commit }) {
      http.get("tasks").then((response) => commit(DEFINE_TASKS, response.data));
    },
    [REGISTER_TASK]({ commit }, task: ITask) {
      return http
        .post("/tasks", task)
        .then((response) => commit(ADD_TASK, response.data));
    },
    [CHANGE_TASK]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then((response) => commit(EDIT_TASK, task));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
