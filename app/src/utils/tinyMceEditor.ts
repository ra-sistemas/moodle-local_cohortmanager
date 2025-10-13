/**
 * TinyMCE Editor utilities for Cohort Manager
 *
 * This utility provides functions to initialize and manage TinyMCE editors
 * in a Vue-friendly way using Moodle's AMD require system.
 */

import { ref } from 'vue';

// Type declaration for TinyMCE editor
declare global {
  interface Window {
    tinyMCE: {
      get: (id: string) => any;
      init: (config: any) => Promise<any[]>;
    };
    require: (modules: string[], callback: (...args: any[]) => void, error?: (error: any) => void) => void;
  }
}

/**
 * Options for TinyMCE editor initialization
 */
export interface TinyMceOptions {
  context?: number;
  draftitemid?: number;
  filepicker?: Record<string, any>;
  language?: Record<string, any>;
  currentLanguage?: string;
  branding?: boolean;
  css?: string[];
  extended_valid_elements?: string;
  plugins?: Record<string, any>;
}

/**
 * Initialize a TinyMCE editor for the specified element
 * 
 * @param elementId - The ID of the textarea element to convert to TinyMCE
 * @param options - Configuration options for the editor
 * @returns Promise that resolves when the editor is initialized
 */
export const initializeTinyMceEditor = async (elementId: string, options: TinyMceOptions = {}): Promise<void> => {
  try {
    // Use Moodle's AMD require to load the editor_tiny/editor module
    await new Promise<void>((resolve, reject) => {
      // @ts-ignore - Moodle's global require function
      window.require(['editor_tiny/editor'], (editor: any) => {
        editor.setupForElementId({
          elementId,
          options: {
            context: 0, // Default context
            draftitemid: 0, // No draft item
            filepicker: {}, // No file picker
            language: {}, // Default language
            currentLanguage: 'en',
            branding: true,
            css: [], // No custom CSS
            extended_valid_elements: '', // No extended valid elements
            plugins: {}, // No additional plugins
            ...options // Override with provided options
          }
        });
        resolve();
      }, (error: any) => {
        console.error('Failed to load editor_tiny/editor module:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Failed to initialize TinyMCE editor:', error);
    throw error;
  }
};

/**
 * Get the TinyMCE editor instance for the specified element ID
 * 
 * @param elementId - The ID of the editor element
 * @returns The TinyMCE editor instance or undefined
 */
export const getTinyMceEditor = (elementId: string): any => {
  return (window as any).tinyMCE?.get(elementId);
};

/**
 * Remove the TinyMCE editor instance for the specified element ID
 * 
 * @param elementId - The ID of the editor element
 */
export const removeTinyMceEditor = (elementId: string): void => {
  const editor = getTinyMceEditor(elementId);
  if (editor) {
    editor.remove();
  }
};

/**
 * Composable for using TinyMCE editor in Vue components
 * 
 * @param elementId - The ID of the textarea element to convert to TinyMCE
 * @param options - Configuration options for the editor
 * @returns Object with editor management functions and state
 */
export const useTinyMceEditor = (elementId: string, options: TinyMceOptions = {}) => {
  const editorInitialized = ref(false);

  /**
   * Initialize the editor
   */
  const initEditor = async (): Promise<void> => {
    if (editorInitialized.value) return;
    
    try {
      await initializeTinyMceEditor(elementId, options);
      editorInitialized.value = true;
    } catch (error) {
      console.error('Failed to initialize TinyMCE editor:', error);
      throw error;
    }
  };

  /**
   * Update editor content
   * 
   * @param content - The content to set in the editor
   */
  const setContent = (content: string): void => {
    if (!editorInitialized.value) return;
    
    const editor = getTinyMceEditor(elementId);
    if (editor) {
      editor.setContent(content);
    }
  };

  /**
   * Get editor content
   * 
   * @returns The current content of the editor
   */
  const getContent = (): string => {
    if (!editorInitialized.value) return '';
    
    const editor = getTinyMceEditor(elementId);
    return editor ? editor.getContent() : '';
  };

  /**
   * Remove the editor
   */
  const removeEditor = (): void => {
    if (!editorInitialized.value) return;
    
    removeTinyMceEditor(elementId);
    editorInitialized.value = false;
  };

  return {
    editorInitialized,
    initEditor,
    setContent,
    getContent,
    removeEditor
  };
};