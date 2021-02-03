import sourceTypeApi from './sourceType';

const prefix = '';

const strategyManageApi = {
  getEntList: `${prefix}/auth/ent/list`,
  getStrategyList: `${prefix}/auth/policy/list`,
  deleteStrategy: `${prefix}/auth/policy/remove`,
  getConditionList: `${prefix}/auth/resource/tag`,
  getMainConditionList: `${prefix}/auth/principle/tag`,
  getConditionValueList: `${prefix}/auth/resource/tag/variable`,
  saveStrategy: `${prefix}/auth/policy/edit`,
  getStrategyDetail: `${prefix}/auth/policy/view`,
};

const api = {
  ...strategyManageApi,
  ...sourceTypeApi,
};

export default api;
