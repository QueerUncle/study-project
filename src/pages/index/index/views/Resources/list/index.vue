<!--
  @Author: lize
  @Date: 2021/1/27
  @Description : 资源类型列表
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/27
 -->
<template>
  <div class="resources-list-page-wrap custom-class-wrap">
    <div class="custom-header-title-wrap">策略管理-资源类型管理</div>
    <div class="custom-header-search-wrap">
      <div class = "search-left-wrap">
        <div class="search-item-wrap">
          <span>业务：</span>
          <div class="custom-empty-wrap">
            {{searchObj.businessStr}}
          </div>
          <el-button size='small' type="primary" plain @click = "handleOpenBusinessModal">
            选择业务
          </el-button>
        </div>
        <div class="search-item-wrap">
          <span>企业：</span>
          <div class="custom-empty-wrap">
            {{searchObj.entInfo.length?searchObj.entInfo[0].name:''}}
          </div>
          <el-button size='small' type="primary" plain @click = "handleOpenModal">选择企业</el-button>
        </div>
        <div class="search-item-wrap" >
          <el-button size='small' type="primary" @click = "handleCurrentChange(1)">查找列表</el-button>
        </div>
      </div>
      <div class = "search-right-wrap">
        <el-button size='small' type="primary"  @click = "handlerEdit()">新增资源类型</el-button>
      </div>
    </div>
    <div class="resources-content-wrap">
      <div class="content-search-wrap">
        <el-select
          style="margin-right: 10px"
          v-model="resourcesTypeValue"
          clearable
          placeholder="请选择"
          size="small">
          <el-option
            v-for="item in resourcesTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" style="width: 200px" v-model="searchKey" placeholder="检索关键字" />
        <el-button
          style="margin-left: 10px"
          size='small'
          type="primary"
          @click = "handleCurrentChange(1)">查找</el-button>
      </div>
      <div class="content-table-wrap">
        <el-table :data="resourcesList" :max-height = "400" style="width: 100%">
            <el-table-column label="序号" width="80">
              <template #default="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sourceType" label="资源类型" />
            <el-table-column prop="sourceKey" label="资源类型key" />
            <el-table-column prop="sourceTag" label="资源标签">
              <template #default="{ row }">
                <span>{{getResourcesTagStr(row.sourceTag)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template #default="{ row }">
                <div class = "active-wrap" >
                  <span @click = "handlerEdit(row)" class = "active-item-wrap">编辑</span>
                  <span @click = "handlerDel(row)" class = "active-item-wrap">删除</span>
                </div>
              </template>
            </el-table-column>
        </el-table>
        <div class = "page-wrap">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:currentPage="searchObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="searchObj.pageSize"
            layout="sizes, prev, pager, next"
            :total="searchObj.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <EntSelect
      :entDialog="entDialog"
      @handleEntSelect="handleEntSelect"
      v-if="entDialog.visible"/>
    <BusiSelect
      :businessDialog="businessDialog"
      @handleBusinessSelect="handleBusinessSelect"
      v-if="businessDialog.visible"
    />
  </div>
</template>

<script lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Http } from '@/assets/http';
import Api from '@/pages/index/index/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import EntSelect from '../../../components/EntSelect/index.vue';
import BusiSelect from '../../../components/BusiSelect/index.vue';

export default {
  name: 'ResourcesList',
  components: {
    EntSelect,
    BusiSelect,
  },
  setup() {
    const Router = useRouter();
    // 企业选择器参数
    const entDialog = ref({
      singleSelect: true,
      visible: false,
      selectedData: [],
    });
    // 业务选择器参数
    const businessDialog = ref({
      singleSelect: true,
      visible: false,
      selectedData: [],
    });
    // 资源类型
    const resourcesTypeList = ref([
      {
        value: 'type',
        label: '资源类型',
      },
      {
        value: 'key',
        label: '资源类型key',
      },
    ]);

    // 资源类型Value
    const resourcesTypeValue = ref('');

    // 检索的关键字
    const searchKey = ref('');

    // 搜索数据
    const searchObj = reactive({
      business: {}, // 业务
      businessStr: '', // 业务str
      entInfo: {}, // 企业信息
      sourceType: '', // 资源类型
      sourceKey: '', // 资源类型key
      pageSize: 10, // 每页多少条
      pageNum: 1, // 当前页
      total: 0, // 总条数
    });

    // 资源列表
    const resourcesList = ref([]);

    // 表头
    const columns = [
      {
        type: 'index',
      },
      {
        type: 'sourceType',
        label: '资源类型',
      },
      {
        type: 'sourceKey',
        label: '资源类型key',
      },
      {
        type: 'sourceTag',
        label: '资源标签',
      },
      {
        type: 'active',
        label: '操作',
      },
    ];

    // 获取资源列表
    const getResourcesList = async () => {
      searchObj.sourceType = resourcesTypeValue.value === 'type' ? searchKey.value : '';
      searchObj.sourceKey = resourcesTypeValue.value === 'key' ? searchKey.value : '';
      const result: any = await Http.post(Api.getResourcesList, searchObj);
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      resourcesList.value = result.data.list;
      searchObj.pageSize = result.data.page.pageSize;
      searchObj.pageNum = result.data.page.pageNum;
      searchObj.total = result.data.page.total;
    };

    // 打开企业选择器
    const handleOpenModal = () => {
      // entDialog.value.visible = true;
      entDialog.value.visible = true;
    };

    // 选择企业
    const handleEntSelect = (params: any): any => {
      searchObj.entInfo = params.selectData; // eslint-disable-line
      entDialog.value.visible = params.visible;
    };

    // 打开业务选择器
    const handleOpenBusinessModal = () => {
      businessDialog.value.visible = true;
      businessDialog.value.selectedData = [searchObj.business];
    };
    // 渲染企业
    const handleRenderEnt = (arr: Partial<EntItem>[]): string => {
      let res = '';
      for (let i = 0; i < arr.length; i += 1) {
        res += `${arr[i].name}，`;
      }
      return res.substring(0, res.length - 2);
    };

    // 选择业务
    const handleBusinessSelect = (params) => {
      const { selectData, visible } = params;
      if (selectData) {
        searchObj.business = selectData[0]; // eslint-disable-line
        searchObj.businessStr = handleRenderEnt([searchObj.business]);
      }
      businessDialog.value.visible = visible;
    };

    // 资源标签处理
    const getResourcesTagStr = (sourceTag: Array<any>): string => {
      if (!sourceTag || !sourceTag.length) return '';
      let str = '';
      for (let i = 0; i < sourceTag.length; i += 1) {
        str += `${sourceTag[i].tagName}：${sourceTag[i].tagType}，`;
      }
      return str;
    };

    // table编辑
    const handlerEdit = (row?: any) => {
      const query = row && row.id ? { id: row.id } : {};
      Router.push({
        path: '/resources-edit',
        query,
      });
    };

    // 改变pageSize
    const handleSizeChange = (val: number): void => {
      searchObj.pageNum = 1;
      searchObj.pageSize = val;
      getResourcesList();
    };

    // 改变pageNum
    const handleCurrentChange = (val: number): void => {
      searchObj.pageNum = val;
      getResourcesList();
    };

    // 删除资源
    const deleteSource = async (id) => {
      const result: any = await Http.post(Api.deleteSource, { id });
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      handleCurrentChange(1);
    };

    // table删除
    const handlerDel = (row) => {
      ElMessageBox.confirm('确定删除该条资源？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteSource(row.id);
      });
    };

    onMounted(() => {
      getResourcesList();
    });
    return {
      entDialog,
      businessDialog,
      resourcesTypeList,
      resourcesTypeValue,
      searchKey,
      searchObj,
      resourcesList,
      columns,
      handleBusinessSelect,
      handleOpenBusinessModal,
      getResourcesTagStr,
      handleOpenModal,
      handleEntSelect,
      handlerEdit,
      handlerDel,
      handleSizeChange,
      handleCurrentChange,
      deleteSource,
    };
  },
};
</script>

<style scoped lang='less'>
@import "index";
</style>
