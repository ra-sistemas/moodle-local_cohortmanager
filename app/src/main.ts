import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const init = async (selector: string) => {
const app = createApp(App);

  app.mount(selector);

  return app;
};

export default { init };