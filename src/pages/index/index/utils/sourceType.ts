// const prefix = '';

const sourceTypeApi = {
  // 获取业务列表
  getBusinessList: '/sys/api/auth/app/list',
  // 获取资源列表
  getResourcesList: '/api/sourceTypeList',
  // 删除资源类型
  deleteSource: '/deleteSource',
  // 保存资源类型
  saveResourceType: '/editSourceType',
  // 资源类型key查重
  Rechecking: '/sourceTypeKeyRechecking',
  // 获取资源详情
  getResourcesDetail: '/sourceDetail',
};

export default sourceTypeApi;
