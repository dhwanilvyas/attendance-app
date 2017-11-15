/**
 * Api.js
 * This file exposes a single instance of axios. The reason for this file is to keep the api
 * methods consistent even if the underlying library changes.
 */

import axios from 'axios';
import Env from '../env';

class API {
  /**
   * Initialises axios instance with provided configs
   * @author dhwanilvyas
   */
  static init() {
    API.axiosInstance = axios.create({
      baseURL: Env.apiUrl,
    });
  }

  /**
   * Returns an instance of Api
   * @author dhwanilvyas
   * @return {Object} returns api instance
   */
  static instance() {
    if (!API.axiosInstance) {
      API.init();
    }

    return API.axiosInstance;
  }

  /**
   * GET method
   * @author dhwanilvyas
   * @param  {String} url          The url to be called
   * @param  {Object} [options={}] Optional configs to be passed in the request
   * @return {Object}              Get method
   */
  static get(url, options = {}) {
    return API.instance().get(url, options);
  }

  /**
   * POST method
   * @author dhwanilvyas
   * @param  {String} url          The url to be called
   * @param  {Object} [options={}] Optional configs to be passed in the request
   * @return {Object}              Post method
   */
  static post(url, data, options = {}) {
    return API.instance().post(url, data, options);
  }

  /**
   * PUT method
   * @author dhwanilvyas
   * @param  {String} url          The url to be called
   * @param  {Object} [options={}] Optional configs to be passed in the request
   * @return {Object}              Put method
   */
  static put(url, data, options = {}) {
    return API.instance().put(url, data, options);
  }

  /**
   * DELETE method
   * @author dhwanilvyas
   * @param  {String} url          The url to be called
   * @param  {Object} [options={}] Optional configs to be passed in the request
   * @return {Object}              Delete method
   */
  static delete(url, data, options = {}) {
    return API.instance().delete(url, data, options);
  }
}

export default API;
