import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import TasksView from "../views/TasksView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import FormView from "../views/projects/FormView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: TasksView,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsView,
  },
  {
    path: "/projects/new",
    name: "New Project",
    component: FormView,
  },
  {
    path: "/projects/:id",
    name: "Edit Project",
    component: FormView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
