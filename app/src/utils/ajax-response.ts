import type { 
  CohortSearchResponse, 
  CohortCreateResponse, 
  CohortUpdateResponse, 
  CohortDeleteResponse,
  AjaxResponse 
} from '../types/moodle-api';

/**
 * Função segura para extrair dados da resposta da API core_cohort_search_cohorts
 */
export const extractSearchResponse = (response: AjaxResponse): CohortSearchResponse => {
  return {
    cohorts: Array.isArray(response.cohorts) ? response.cohorts : [],
    total: response.total || 0
  };
};

/**
 * Função segura para extrair dados da resposta da API core_cohort_create_cohorts
 */
export const extractCreateResponse = (response: AjaxResponse): CohortCreateResponse => {
  return {
    cohorts: Array.isArray(response.cohorts) ? response.cohorts : []
  };
};

/**
 * Função segura para extrair dados da resposta da API core_cohort_update_cohorts
 */
export const extractUpdateResponse = (response: AjaxResponse): CohortUpdateResponse => {
  return {
    cohorts: Array.isArray(response.cohorts) ? response.cohorts : []
  };
};

/**
 * Função segura para extrair dados da resposta da API core_cohort_delete_cohorts
 */
export const extractDeleteResponse = (response: AjaxResponse): CohortDeleteResponse => {
  return {
    cohorts: Array.isArray(response.cohorts) ? response.cohorts : []
  };
};

/**
 * Função segura para extrair dados da resposta da API core_cohort_get_cohorts
 */
export const extractGetCohortsResponse = (response: AjaxResponse): any[] => {
  return Array.isArray(response) ? response : [];
};

/**
 * Função segura para extrair dados da resposta da API core_cohort_get_cohort_members
 */
export const extractGetCohortMembersResponse = (response: AjaxResponse): Record<number, any[]> => {
  return typeof response === 'object' && response !== null ? response : {};
};

/**
 * Função genérica para extrair dados de resposta com fallback seguro
 */
export const safeExtractResponse = <T>(response: AjaxResponse, extractor: (response: AjaxResponse) => T, defaultValue: T): T => {
  try {
    return extractor(response);
  } catch (error) {
    console.warn('Error extracting response:', error);
    return defaultValue;
  }
};