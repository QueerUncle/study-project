import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/sys/api/auth/ent/list`,
  getStrategyList: `${prefix}/api/getStrategyList`,
  deleteStrategy: `${prefix}/api/deleteStrategy`,
  getConditionList: `${prefix}/sys/api/auth/resource/tag`,
  getMainConditionList: `${prefix}/sys/api/auth/principle/tag`,
  getConditionValueList: `${prefix}/sys/api/auth/resource/tag/variable`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
