/*
  @Author: lize
  @Date: 2021/1/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/27
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const Http = axios.create({
  baseURL: process.env.VUE_APP_API, // api请求的baseURL
  timeout: 600000,
  withCredentials: true, // 允许跨域 cookie
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 2000,
});

// 请求拦截器
Http.interceptors.request.use((config: any) => { // eslint-disable-line
  if (config.baseURL) {
    if (config.url.includes('index/userLogout')) {
      config.baseURL = '/'; // eslint-disable-line
    } else {
      config.baseURL = process.env.VUE_APP_API; // eslint-disable-line
    }
  }
  return config;
}, (err: AxiosRequestConfig) => Promise.reject(err));
// 响应拦截器
Http.interceptors.response.use((response: AxiosResponse) => {
  if (typeof response.config.data === 'string'
    && response.config.data && JSON.parse(response.config.data).isImage) {
    return response.data;
  }
  if (response.data.code === 200 || response.data.code === 406) { // eslint-disable-line
    return response.data;
  }
  if (response.data.code === 400) {// eslint-disable-line
    (<any>ElMessage).error(response.data.msg || response.data.ElMessage); // eslint-disable-line
    return response.data;
  }
  if (response.data.errorUrl) {
    let urlStr = encodeURIComponent(window.location.href);
    urlStr = btoa(urlStr);
    window.location.href = `${response.data.errorUrl}/${urlStr}`;
  } else {
    window.location.href = `/errorPage/index.html?error=${response.data.errorElMessage}`;
  }
  return false;
}, (err: AxiosResponse) => Promise.reject(err));

export { Http };

export default {
  install(app: any) { // eslint-disable-line
    app.config.globalProperties.$Http = Http; // eslint-disable-line
  },
};
