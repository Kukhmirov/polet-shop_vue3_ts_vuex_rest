import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from "./store/index";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'

import "@/assets/style/index.scss";

library.add(fab, fas)


const app = createApp(App)
    .use(store, key)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
    app.mount("#app");
});