import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/getEntList`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
