import http from "@/http";
import { Module } from "vuex";
import type ITask from "@/interfaces/ITask";
import { State } from "@store";
import {
  DEFINE_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
} from "@/store/mutations";
import {
  GET_TASKS,
  REGISTER_TASK,
  CHANGE_TASK,
  REMOVE_TASK,
} from "@/store/actions";

export interface TaskState {
  tasks: ITask[];
}

export const task: Module<TaskState, State> = {
  mutations: {
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
  },
  actions: {
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
};
