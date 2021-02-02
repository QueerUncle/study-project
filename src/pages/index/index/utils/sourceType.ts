// const prefix = '';

const sourceTypeApi = {
  // 获取业务列表
  getBusinessList: '/sys/api/auth/app/list',
  // 获取资源列表
  getResourcesList: '/sys/api/auth/resource/list',
  // 删除资源类型
  deleteSource: '/sys/api/auth/resource/remove',
  // 保存资源类型
  saveResourceType: '/sys/api/auth/resource/edit',
  // 获取标签类型
  geTagType: '/sys/api/auth/tag/type',
  // 资源类型key查重
  Rechecking: '/api/sourceTypeKeyRechecking',
  // 获取资源详情
  getResourcesDetail: '/sys/api/auth/resource/view',
};

export default sourceTypeApi;
