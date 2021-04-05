import axios from 'axios';
import { getToken, getSettings } from '../utils/storage';
import { BASE_API_URL } from './config';

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export function setToken(token) {
  if (token && token !== '') {
    api.defaults.headers.common.Authorization = 'Bearer ' + token;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
  api.defaults.headers.common.os = 'iphone';
  console.log('refreashing', token)
}
export function setlanguage(language) {
  api.defaults.headers['Accept-Language'] = language;

}

getSettings().then((settings) => {
  if (!settings) {
    setlanguage('en');
  } else {
    if (settings.language) {
      setlanguage('ar');
    } else {
      setlanguage('en');
    }
  }


})
getToken().then((token) => {
  setToken(token);
});
