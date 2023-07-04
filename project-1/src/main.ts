import { createApp } from "vue";
import router from "./router";
import { key, store } from "./store";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";

createApp(App).use(router).use(store, key).mount("#app");
