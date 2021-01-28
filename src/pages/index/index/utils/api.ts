import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/getEntList`,
  getStrategyList: `${prefix}/getStrategyList`,
  deleteStrategy: `${prefix}/deleteStrategy`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
