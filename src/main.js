import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// swiper
import "swiper/css";
// Meting 播放器
import Meting from "@meting/aplayer-vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

// ----------------------------
// 单独挂载 Meting 播放器
// ----------------------------

// 创建播放器容器
const container = document.createElement("div");
container.id = "player-container";
document.body.appendChild(container);

// 创建并挂载播放器实例
createApp({
  render: () =>
    h(Meting, {
      server: import.meta.env.VITE_SONG_SERVER,
      type: import.meta.env.VITE_SONG_TYPE,
      id: import.meta.env.VITE_SONG_ID,
      api: import.meta.env.VITE_SONG_API,
      style: "position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999;",
    }),
}).mount("#player-container");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  console.log("站点已更新，刷新后生效");
  ElMessage("站点已更新，刷新后生效");
});
