import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/sys/api/auth/ent/list`,
  getStrategyList: `${prefix}/api/getStrategyList`,
  deleteStrategy: `${prefix}/api/deleteStrategy`,
  getConditionList: `${prefix}/api/getMainCondition`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
