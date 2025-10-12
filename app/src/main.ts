import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { loadAllStrings } from './utils/moodle'

const init = async (selector: string) => {
  const app = createApp(App);
  const pinia = createPinia();
  
  // Use the router and pinia
  app.use(router);
  app.use(pinia);
  
  // Preload all strings when the app initializes
  try {
    await loadAllStrings();
    console.log('All strings loaded successfully');

  } catch (error) {
    console.warn('Failed to preload some strings:', error);
  }
  
  app.mount(selector);

  return app;
};

export default { init };