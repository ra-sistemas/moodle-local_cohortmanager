import { defineStore } from 'pinia';
import { getAllStrings } from '../utils/moodle';
import Notification from 'core/notification';

interface ExternalStringData {
  identifier: string;
  value: string;
}

interface LanguageData {
  language: string;
  strings: ExternalStringData[];
}

interface StringsState {
  strings: Record<string, string>;
  loading: boolean;
  error: string | null;
  loadedComponents: Set<string>;
}

export const useStringsStore = defineStore('strings', {
  state: (): StringsState => ({
    strings: {},
    loading: false,
    error: null,
    loadedComponents: new Set(),
  }),

  getters: {
    getString: (state: StringsState) => (key: string, fallback?: string) => {
      return state.strings[key] || fallback || key;
    },
    
    isComponentLoaded: (state: StringsState) => (component: string) => {
      return state.loadedComponents.has(component);
    },
    
    isLoading: (state: StringsState) => state.loading,
    
    hasError: (state: StringsState) => state.error !== null,
  },

  actions: {
    async loadAllStringsFromExternal() {
      this.loading = true;

      try {
        const response = await getAllStrings();
        
        // Process the response from external service
        if (response && Array.isArray(response)) {
          response.forEach((langData: LanguageData) => {
            if (langData.strings && Array.isArray(langData.strings)) {
              langData.strings.forEach((stringData: ExternalStringData) => {
                if (stringData.identifier && stringData.value) {
                  this.strings[stringData.identifier] = stringData.value;
                }
              });
            }
          });
        }
      } catch (err) {
        Notification.exception(err);
      } finally {
        this.loading = false;
      }
    }
  },
});