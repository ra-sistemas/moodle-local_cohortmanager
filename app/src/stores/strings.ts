import { defineStore } from 'pinia';
import { get_string as getMoodleString } from 'core/str';

interface StringKey {
  key: string;
  component: string;
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
    async loadStringsForComponent(component: string, stringKeys: StringKey[]) {
      if (this.loadedComponents.has(component)) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const keysToLoad = stringKeys.filter(({ key }) => !this.strings[key]);
        
        if (keysToLoad.length === 0) {
          this.loadedComponents.add(component);
          return;
        }

        const promises = keysToLoad.map(({ key }) =>
          getMoodleString(`local_cohortmanager`, key)
            .then((translation: string) => {
              this.strings[key] = translation;
            })
            .catch((error: any) => {
              console.warn(`Failed to load string "${key}":`, error);
              this.strings[key] = key; // Fallback to the key itself
            })
        );

        await Promise.all(promises);
        this.loadedComponents.add(component);
      } catch (error) {
        console.error(`Failed to load strings for component "${component}":`, error);
        this.error = `Failed to load strings for ${component}`;
      } finally {
        this.loading = false;
      }
    },

    async loadAllStrings(stringKeys: StringKey[]) {
      const uniqueComponents = [...new Set(stringKeys.map(({ component }) => component))];
      
      for (const component of uniqueComponents) {
        const componentKeys = stringKeys.filter((item) => item.component === component);
        await this.loadStringsForComponent(component, componentKeys);
      }
    },

    getStringSafely(key: string, fallback?: string): string {
      if (this.strings[key]) {
        return this.strings[key];
      }
      
      // If not loaded yet, return fallback or key
      return fallback || key;
    },

    clearCache() {
      this.strings = {};
      this.loadedComponents.clear();
      this.error = null;
    },
  },
});