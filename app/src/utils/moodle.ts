import Ajax from "core/ajax";
import * as Config from "core/config";
import Notification from "core/notification";

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
    return await Ajax.call([request]);
  } catch (e) {
    if (isDebugEnabled) {
      Notification.exception(e);
    }
    throw e;
  }
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

export { ajax, requestWithFiles };