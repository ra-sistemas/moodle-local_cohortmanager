import { defineStore } from 'pinia';
import { get_strings, get_string, cache_strings } from 'core/str';

interface StringKey {
  key: string;
  component: string;
  param?: object | string;
  lang?: string;
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
    async loadStringsForComponent(this: any, component: string, stringKeys: StringKey[]) {
      if (this.loadedComponents.has(component)) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // Filter out strings that are already loaded
        const keysToLoad = stringKeys.filter(({ key }) => !this.strings[key]);
        
        if (keysToLoad.length === 0) {
          this.loadedComponents.add(component);
          return;
        }
        // Prepare requests for get_strings
        const requests = keysToLoad.map(({ key, param }) => ({
          key,
          component: 'local_cohortmanager',
          param
        }));

        // Use get_strings for batch loading
        const results = await get_strings(requests);
        
        // Update the store with loaded strings
        results.forEach((translation, index) => {
          const stringRequest = keysToLoad[index];
          if (stringRequest && stringRequest.key) {
            const originalKey = stringRequest.key;
            if (translation) {
              this.strings[originalKey] = translation;
            } else {
              // Fallback to the key itself if translation is null/undefined
              this.strings[originalKey] = originalKey;
            }
          }
        });

        this.loadedComponents.add(component);
      } catch (error) {
        console.error(`Failed to load strings for component "${component}":`, error);
        this.error = `Failed to load strings for ${component}`;
        
        // Even on error, mark component as loaded to prevent repeated attempts
        this.loadedComponents.add(component);
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

    /**
     * Load a single string with support for parameters
     * @param key The string identifier
     * @param component The component name (defaults to 'local_cohortmanager')
     * @param param Optional parameters for variable expansion
     * @param lang Optional language code
     * @returns Promise that resolves to the translated string
     */
    async loadSingleString(key: string, component?: string, param?: object | string, lang?: string): Promise<string> {
      try {
        const result = await get_string(key, component || 'local_cohortmanager', param, lang);
        this.strings[key] = result;
        return result;
      } catch (error) {
        console.warn(`Failed to load string "${key}":`, error);
        this.strings[key] = key; // Fallback to the key itself
        return key;
      }
    },

    /**
     * Get a string with fallback support
     * @param key The string identifier
     * @param fallback Fallback value if string is not found
     * @returns The translated string or fallback
     */
    getStringSafely(key: string, fallback?: string): string {
      if (this.strings[key]) {
        return this.strings[key];
      }
      
      // If not loaded yet, return fallback or key
      return fallback || key;
    },

    /**
     * Pre-cache strings for better performance
     * @param strings Array of string objects to cache
     */
    cacheStrings(strings: { key: string; value: string; component?: string; lang?: string }[]) {
      try {
        cache_strings(strings);
        // Also update our local cache
        strings.forEach(({ key, value }) => {
          this.strings[key] = value;
        });
      } catch (error) {
        console.error('Failed to cache strings:', error);
      }
    },

    /**
     * Clear all cached strings
     */
    clearCache() {
      this.strings = {};
      this.loadedComponents.clear();
      this.error = null;
    },

    /**
     * Check if a specific string is loaded
     * @param key The string identifier
     * @returns True if the string is loaded, false otherwise
     */
    isStringLoaded(key: string): boolean {
      return key in this.strings;
    },
  },
});