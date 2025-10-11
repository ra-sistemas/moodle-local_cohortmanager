import Ajax from "core/ajax";
import * as Config from "core/config";
import Notification from "core/notification";
import {
  extractSearchResponse,
  extractCreateResponse,
  extractUpdateResponse,
  extractDeleteResponse,
  extractGetCohortsResponse,
  extractGetCohortMembersResponse
} from './ajax-response';

const isDebugEnabled = Config.developerdebug;

/**
 * Perform an AJAX call to a Moodle web service.
 *
 * @param {string} method - The name of the web service method to call.
 * @param {Object} [args={}] - The arguments to pass to the web service.
 *
 * @returns {Promise<Object>} - The result of the AJAX call.
 *
 * @throws {Error} If the AJAX call fails, this function will rethrow the error.
 */
const ajax = async (method: string, args: Object): Promise<object> => {
  const request = {
    methodname: method,
    args: Object.assign({}, args),
  };

  try {
    const responses = await Ajax.call([request]);
    // Ajax.call returns an array, we need the first response
    return responses[0];
  } catch (e) {
    if (isDebugEnabled) {
      Notification.exception(e);
    }
    throw e;
  }
};

// Funções específicas para cada tipo de chamada AJAX com tratamento de resposta tipado

/**
 * Buscar cohorts com tratamento de resposta tipado
 */
const searchCohorts = async (args: Object): Promise<any> => {
  const response = await ajax('core_cohort_search_cohorts', args);
  return extractSearchResponse(response);
};

/**
 * Criar cohorts com tratamento de resposta tipado
 */
const createCohorts = async (args: Object): Promise<any[]> => {
  const response = await ajax('core_cohort_create_cohorts', args);
  return extractCreateResponse(response).cohorts;
};

/**
 * Atualizar cohorts com tratamento de resposta tipado
 */
const updateCohorts = async (args: Object): Promise<any[]> => {
  const response = await ajax('core_cohort_update_cohorts', args);
  return extractUpdateResponse(response).cohorts;
};

/**
 * Deletar cohorts com tratamento de resposta tipado
 */
const deleteCohorts = async (args: Object): Promise<any[]> => {
  const response = await ajax('core_cohort_delete_cohorts', args);
  return extractDeleteResponse(response).cohorts;
};

/**
 * Obter detalhes de cohorts com tratamento de resposta tipado
 */
const getCohorts = async (args: Object): Promise<any[]> => {
  const response = await ajax('core_cohort_get_cohorts', args);
  return extractGetCohortsResponse(response);
};

/**
 * Obter membros de cohorts com tratamento de resposta tipado
 */
const getCohortMembers = async (args: Object): Promise<Record<number, any[]>> => {
  const response = await ajax('core_cohort_get_cohort_members', args);
  return extractGetCohortMembersResponse(response);
};

/**
 * Perform an AJAX call to a Moodle web service with file uploads.
 *
 * @param {Object} request - The request object to pass to the web service.
 * @param {File[]} files - The files to upload to the web service.
 *
 * @returns {Promise<Object>} - The result of the AJAX call.
 *
 * @throws {Error} If the AJAX call fails, this function will rethrow the error.
 */
const requestWithFiles = async (request: object, files: File[]): Promise<object> => {
  try {
    return await Ajax.callWithFiles(request, files);
  } catch (e) {
    if (isDebugEnabled) {
      Notification.exception(e);
    }
    throw e;
  }
};

export {
  ajax,
  requestWithFiles,
  searchCohorts,
  createCohorts,
  updateCohorts,
  deleteCohorts,
  getCohorts,
  getCohortMembers
};