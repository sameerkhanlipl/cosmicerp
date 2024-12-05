import instance from './instance';
import {store} from '../store/store';

instance.interceptors.request.use(request => {
  const storeData = store.getState();

  if (storeData?.app?.user?.token) {
    request.headers.Authorization = 'Bearer ' + storeData?.app?.user?.token;
  }

  return request;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response) {
      throw error.response;
    } else {
      throw error;
    }
  },
);

export default instance;
