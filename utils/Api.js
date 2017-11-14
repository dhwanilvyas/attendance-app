import axios from 'axios';

class API {
  static init() {
    API.axiosInstance = axios.create({
      baseURL: 'https://199e76ae.ngrok.io/api/',
    });
  }

  static instance() {
    if (!API.axiosInstance) {
      API.init();
    }

    return API.axiosInstance;
  }

  static get(url, options = {}) {
    return API.instance().get(url, options);
  }

  static post(url, data, options = {}) {
    return API.instance().post(url, data, options);
  }

  static put(url, data, options = {}) {
    return API.instance().put(url, data, options);
  }

  static delete(url, data, options = {}) {
    return API.instance().delete(url, data, options);
  }
}

export default API;
