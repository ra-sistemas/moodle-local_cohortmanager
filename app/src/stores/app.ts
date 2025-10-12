import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAppConfig } from '../utils/moodle';
import Notification from 'core/notification';
/**
 * App Store for managing global application settings
 */
export const useAppStore = defineStore('app', () => {
    // State
    const appConfig = ref<any>(null);
    const isLoading = ref(false);

    // Actions
    const fetchAppConfig = async () => {
        try {
            isLoading.value = true;
            const result = await getAppConfig();
            appConfig.value = result;
        } catch (err) {
            Notification.exception(err);
            appConfig.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    const setAppConfig = (config: any) => {
        appConfig.value = config;
    };

    // Getters
    const getAllowCohortThemes = (): boolean | null => {
        return appConfig.value?.allowcohortthemes || null;
    };
    
    const isAllowCohortThemesEnabled = (): boolean => {
        return getAllowCohortThemes() === true;
    };

    return {
        // State
        appConfig,
        isLoading,
        
        // Actions
        fetchAppConfig,
        setAppConfig,
        
        // Getters
        getAllowCohortThemes,
        isAllowCohortThemesEnabled,
    };
});