/*
 * @Author: libf
 * @Date: 2021-01-28 09:46:55
 * @Last Modified by: libf
 * @Last Modified time: 2021-01-28 10:44:55
 */

<template>
  <div class="resources-list-page-wrap custom-class-wrap">
    <div class="custom-header-title-wrap">策略管理-策略列表</div>
    <div class="custom-header-search-wrap">
      <div class="search-left-wrap">
        <div class="search-item-wrap">
          <span>业务：</span>
          <el-select
            v-model="businessValue"
            placeholder="请选择"
            clearable
            size="small"
            @change="businessValueChange"
          >
            <el-option
              v-for="item in businessList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item-wrap">
          <span>企业：</span>
          <div class="empty-wrap">{{searchObj.entInfo.name}}</div>
          <el-button
            size="small"
            type="primary"
            plain
            @click="handleOpenModal"
          >选择企业</el-button>
        </div>
        <div class="search-item-wrap">
          <el-button
            size="small"
            type="primary"
            @click="handleCurrentChange(1)"
          >查找列表</el-button>
        </div>
      </div>
      <div class="search-right-wrap">
        <el-button
          size="small"
          type="primary"
          @click="handleEditStrategy()"
        >新增策略</el-button>
      </div>
    </div>
    <div class="resources-content-wrap">
      <div class="content-search-wrap">
        <el-select
          style="margin-right: 10px"
          v-model="resourcesTypeValue"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in searchList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          size="small"
          style="width: 200px"
          v-model="searchKey"
          placeholder="检索关键字"
        />
        <el-button
          style="margin-left: 10px"
          size="small"
          type="primary"
          @click="handleCurrentChange(1)"
        >查找</el-button>
      </div>
      <div class="content-table-wrap">
        <el-table
          :data="strategyList"
          :max-height="400"
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            width="80"
          >
            <template #default="scope">
              <span>{{(searchObj.pageNum - 1) * searchObj.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="180"
          />
          <el-table-column
            prop="business"
            label="来源业务"
            width="280"
          >
            <template #default="{ row }">
              <span>{{row.business.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entInfo"
            label="归属企业"
          >
            <template #default="{ row }">
              <span>{{handleRenderEnt(row.entInfo)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="操作"
          >
            <template #default="{ row }">
              <div class="active-wrap">
                <span
                  @click="handleEditStrategy(row)"
                  class="active-item-wrap"
                >编辑</span>
                <span
                  @click="handleDeleteStrategy(row)"
                  class="active-item-wrap"
                >删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrap">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            v-model:currentPage="searchObj.pageNum"
            :page-size="searchObj.pageSize"
            layout="prev, pager, next"
            :total="searchObj.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <EntSelect
      :entDialog="entDialog"
      @handleEntSelect="handleEntSelect"
      v-if="entDialog.visible"
    />
  </div>
</template>

<script lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Http } from '@/assets/http';
import Api from '@/pages/index/index/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import EntSelect from '../../components/EntSelect/index.vue';

export default {
  name: 'StrategyList',
  components: {
    EntSelect,
  },
  setup() {
    const Router = useRouter();
    // 企业选择器参数
    const entDialog = ref({
      singleSelect: true,
      visible: false,
    });
    // 业务下拉
    const businessList = ref([]);
    // 业务下拉Value
    const businessValue = ref('');

    // 资源类型
    const searchList = ref([
      {
        value: 'description',
        label: '描述',
      },
    ]);

    // 资源类型Value发生Change时
    const resourcesTypeValue = ref('description');

    // 检索的关键字
    const searchKey = ref('');

    // 搜索数据
    const searchObj = reactive({
      business: {}, // 业务
      entInfo: {}, // 企业信息
      description: '', // 资源类型
      pageSize: 10, // 每页多少条
      pageNum: 1, // 当前页
      total: 0, // 总条数
    });

    // 资源列表
    const strategyList = ref([]);

    // 渲染企业
    const handleRenderEnt = (arr: Partial<EntItem>[]): string => {
      let res = '';
      for (let i = 0; i < arr.length; i += 1) {
        res += `${arr[i].name}，`;
      }
      return res.substring(0, res.length - 2);
    };

    // 获取策略列表
    const getStrategyList = async () => {
      /* eslint-disable */
      searchObj.description = searchKey.value || '';

      /* eslint-enable */
      const result: any = await Http.post(Api.getStrategyList, searchObj);
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      strategyList.value = result.data.list;
      searchObj.pageSize = result.data.page.pageSize;
      searchObj.pageNum = result.data.page.pageNum;
      searchObj.total = result.data.page.total;
    };

    // 打开企业选择器
    const handleOpenModal = () => {
      entDialog.value.visible = true;
    };

    // 选择企业
    const handleEntSelect = (params: any): any => {
      const { selectData, visible } = params;

      entDialog.value.visible = visible;
      [searchObj.entInfo] = selectData;
    };

    // 业务发生Change时
    const businessValueChange = (value: any): void => {
      [searchObj.business] = businessList.value.filter(
        (item) => item.id === value,
      );
    };

    // 编辑策略
    const handleEditStrategy = (row?: any) => {
      const query = row && row.id ? { id: row.id } : {};
      Router.push({
        path: '/strategy-detail',
        query,
      });
    };

    // 改变pageNum
    const handleCurrentChange = (val: number): void => {
      searchObj.pageNum = val;
      getStrategyList();
    };

    // 删除策略
    const deleteStrategy = async (id) => {
      const result: any = await Http.post(Api.deleteStrategy, { id });
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      handleCurrentChange(1);
    };

    // 获取业务下拉
    const getBusinessList = async () => {
      const result: any = await Http.get(Api.getBusinessList);
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      businessList.value = result.data.list;
    };

    // 删除策略
    const handleDeleteStrategy = (row) => {
      ElMessageBox.confirm('确定删除该策略？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteStrategy(row.id);
      });
    };

    onMounted(() => {
      getBusinessList();
      getStrategyList();
    });
    return {
      entDialog,
      businessList,
      businessValue,
      searchList,
      resourcesTypeValue,
      searchKey,
      searchObj,
      strategyList,
      handleOpenModal,
      handleEntSelect,
      handleEditStrategy,
      handleDeleteStrategy,
      businessValueChange,
      handleCurrentChange,
      getBusinessList,
      handleRenderEnt,
    };
  },
};
</script>

<style scoped lang='less'>
@import '../Resources/list/index.less';
</style>
