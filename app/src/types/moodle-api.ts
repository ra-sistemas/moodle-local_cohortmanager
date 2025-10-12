/**
 * Tipos específicos para as respostas das APIs do Moodle
 */

// Interface base para Cohort
export interface Cohort {
  id: number;
  name: string;
  idnumber: string;
  description: string;
  descriptionformat: number;
  visible: boolean;
  theme?: string;
  customfields?: Array<{
    name: string;
    shortname: string;
    type: string;
    valueraw: string;
    value: string;
  }>;
}

// Resposta da API core_cohort_search_cohorts
export interface CohortSearchResponse {
  cohorts: Cohort[];
  total: number;
}

// Resposta da API core_cohort_create_cohorts
export interface CohortCreateResponse {
  cohorts: Cohort[];
}

// Resposta da API core_cohort_update_cohorts
export interface CohortUpdateResponse {
  cohorts: Cohort[];
}

// Resposta da API core_cohort_delete_cohorts
export interface CohortDeleteResponse {
  success: Boolean;
}

// Resposta genérica da API Ajax
export interface AjaxResponse {
  [key: string]: any;
}

// Tipos de retorno para as funções AJAX
export type MoodleAjaxResponse<T = AjaxResponse> = T;