// const prefix = '';

const sourceTypeApi = {
  // 获取业务列表
  getBusinessList: '/auth/app/list',
  // 获取资源列表
  getResourcesList: '/auth/resource/list',
  // 删除资源类型
  deleteSource: '/auth/resource/remove',
  // 保存资源类型
  saveResourceType: '/auth/resource/edit',
  // 获取标签类型
  geTagType: '/auth/tag/type',
  // 资源类型key查重
  Rechecking: '/api/sourceTypeKeyRechecking',
  // 获取资源详情
  getResourcesDetail: '/auth/resource/view',
};

export default sourceTypeApi;
