import { defineStore } from 'pinia';
import { getAppConfig } from '../utils/moodle';
import Notification from 'core/notification';

interface AppConfig {
  allowcohortthemes?: boolean;
  themelist?: Array<Object>;
  contextlist?: Array<Object>;
  tinymceconfig?: string
  // Add other config properties as needed
}

interface AppState {
  appConfig: AppConfig | null;
  error: string | null;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appConfig: null,
    error: null,
  }),

  getters: {
    getAllowCohortThemes: (state: AppState) => (): boolean | null => {
      return state.appConfig?.allowcohortthemes || null;
    },

    getThemeList: (state: AppState) => (): Array<Object> => {
      return state.appConfig?.themelist || [];
    },

    getContextList: (state: AppState) => (): Array<Object> => {
      return state.appConfig?.contextlist || [];
    },

    getTinyMCEConfig: (state: AppState) => (): Object => {
      return JSON.parse(state.appConfig?.tinymceconfig || '') || {};
    },

    isAllowCohortThemesEnabled: (state: AppState) => (): boolean => {
      return state.appConfig?.allowcohortthemes === true;
    },

    hasError: (state: AppState) => state.error !== null,
  },

  actions: {
    async fetchAppConfig() {
      this.error = null;

      try {
        const result = await getAppConfig();
        this.appConfig = result;
      } catch (err) {
        Notification.exception(err);
        this.appConfig = null;
        this.error = 'Failed to fetch app configuration';
      }
    },

    setAppConfig(config: AppConfig) {
      this.appConfig = config;
    },

    clearError() {
      this.error = null;
    },
  },
});