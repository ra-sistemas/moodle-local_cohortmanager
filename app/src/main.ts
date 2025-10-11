import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const init = async (selector: string) => {
  const app = createApp(App);
  
  // Use the router
  app.use(router);
  
  app.mount(selector);

  return app;
};

export default { init };