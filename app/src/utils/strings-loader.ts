import { useStringsStore } from '../stores/strings';

/**
 * Load all strings for the application from the external service
 * This replaces the need to declare all string keys manually
 */
export const loadAllStrings = async () => {
  const stringsStore = useStringsStore();
  await stringsStore.loadAllStringsFromExternal();
};