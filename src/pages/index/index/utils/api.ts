import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
