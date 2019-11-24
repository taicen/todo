import axios from 'axios';

const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
const API_KEY = '?developer=';

const encodeObjectToURI = (object) => {
  // encodeURIComponent - метод, кодирующий компонент универсального идентификатора ресурса (URI) заменой каждой определенной последовательности символов одной, двумя, тремя или четырьмя последовательностями символов, представленных в кодировке UTF-8
  let query = '&' +
      Object.keys(object)
          .map(key => {
              return encodeURIComponent(key) + '=' + object[key];
          })
          .join('&');

  return query;
}

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export const getResource = async (url, developer='admin', params) => {
  try {
    const response = await axiosApi.get( `${url}${API_KEY}${developer}` + encodeObjectToURI(params || {}) );
    // console.log('API', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postResource = async (url, developer='admin', params) => {
  console.log('POST', params);
  try {
    const response = await axiosApi({ 
      method: 'post',
      url: `${url}${API_KEY}${developer}`, 
      data: params || {}, 
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('API POST', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getTasks = (params, developer) => {
  return getResource(`/`, developer, { ...params });
}

export const addTask = (params, developer) => {
  return postResource(`/create`, developer, params);
}

export const editTask = (id, params, developer) => {
  return postResource(`/edit/${id}`, developer, params);
}

export const authApp = (params, developer) => {
  return postResource(`/login`, developer, params);
}

export const fetchData = async (url, page = 1) => {
    page = page ? "&page=" + page : null;
    url = page ? url + page : url;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchStatus = (action, payload) => {
    return {
        type: action,
        payload
    }
}
