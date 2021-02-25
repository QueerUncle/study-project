/*
 * @Author: libf
 * @Date: 2021-01-28 10:36:15
 * @Last Modified by: libf
 * @Last Modified time: 2021-02-02 13:53:29
 */
<template>
  <div class="resources-edit-wrap custom-class-wrap">
    <div class="custom-header-title-wrap">策略管理-编辑策略</div>
    <div class="custom-header-search-wrap">
      <div class="search-left-wrap" />
      <div class="search-right-wrap">
        <el-button
          size="small"
          type="warning"
          @click="goBack"
        >返回</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSave"
        >保存</el-button>
      </div>
    </div>
    <div class="resources-edit-content-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="customForm"
        label-width="120px"
      >
        <el-form-item
          label="描述信息"
          prop="description"
        >
          <el-input
            style="width: 55%"
            type="textarea"
            :rows="4"
            v-model="ruleForm.description"
            placeholder="当前策略的简述信息"
          />
        </el-form-item>
        <el-form-item
          label="所属业务"
          prop="business"
        >
          <!-- <el-cascader
            style="width:55%"
            :options="businessOptions"
            :props="{multiple: false}"
            v-if="businessOptions.length"
            v-model="ruleForm.business"
            placeholder="请选择策略所属业务"
            clearable
          ></el-cascader>-->
          <el-input
            style="margin-right:20px;width: 55%"
            v-model="ruleForm.businessStr"
            placeholder="请选择策略所属业务"
            readonly
          />
          <el-button
            size="mini"
            type="primary"
            @click="handleOpenBusinessModal"
          >选择业务</el-button>
        </el-form-item>
        <el-form-item
          label="所属企业"
          prop="entInfo"
        >
          <div style="display: flex;align-items: center;">
            <el-input
              style="margin-right:20px;width: 55%"
              v-model="ruleForm.entInfoStr"
              placeholder="所属企业列表可复选"
              readonly
            />
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenModal"
            >选择企业</el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="策略逻辑"
          prop="strategyLogic"
        >
          <div style="display: flex; align-items: center;height:40px">
            <el-radio
              v-model="ruleForm.strategyLogic"
              :label="true"
            >允许</el-radio>
            <el-radio
              v-model="ruleForm.strategyLogic"
              :label="false"
            >禁止</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div class="source-tag-wrap">
        <div class="label-wrap">
          <p>资源</p>
        </div>
        <div class="table-wrap">
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="handleAddItem('source')"
            >新增资源</el-button>
          </div>
          <el-table
            :data="ruleForm.source"
            style="width: 100%"
            :max-height="300"
            empty-text="暂无数据"
            header-row-class-name="table-header"
          >
            <el-table-column label="资源类型">
              <template #default="{ row, $index }">
                <div class="source-wrap">
                  <div>{{row.sourceType.name}}</div>
                  <el-button
                    type="primary"
                    @click="handleSelectResource($index)"
                  >选择</el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="address"
              label="资源实例"
            >
              <template #default="{ row }">
                <el-input
                  v-model="row.sourceExample"
                  placeholder="资源实例"
                />
              </template>
            </el-table-column>
            <el-table-column
              width="130"
              label="操作"
            >
              <template #default="{ $index }">
                <div class="active-wrap">
                  <span
                    @click="handleDeleteValidate('source', $index)"
                    class="active-item-wrap"
                  >删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="source-tag-wrap">
        <div class="label-wrap">
          <p>角色</p>
        </div>
        <div class="table-wrap">
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="handleAddItem('roleList')"
            >新增角色</el-button>
          </div>
          <el-table
            :data="ruleForm.roleList"
            style="width: 100%"
            :max-height="300"
            empty-text="暂无数据"
            header-row-class-name="table-header"
          >
            <el-table-column label="主体类型">
              <template #default="{ row }">
                <div>{{row.mainType}}</div>
              </template>
            </el-table-column>
            <el-table-column label="主体条件">
              <template #default="{ row }">
                <el-select
                  v-model="row.mainCondition"
                  placeholder="主体条件"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                    v-for="item in mainConditionOptions"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="主体值"
            >
              <template #default="{ row }">
                <el-input
                  v-model="row.mainValue"
                  placeholder="自定角色"
                />
              </template>
            </el-table-column>
            <el-table-column
              width="130"
              label="操作"
            >
              <template #default="{ $index }">
                <div class="active-wrap">
                  <span
                    @click="handleCopyItem('roleList', $index)"
                    class="active-item-wrap"
                  >复制</span>
                  <span
                    @click="handleDeleteValidate('roleList', $index)"
                    class="active-item-wrap"
                  >删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="source-tag-wrap">
        <div class="label-wrap">
          <p>条件</p>
        </div>
        <div class="table-wrap">
          <el-table
            :data="ruleForm.conditionList"
            style="width: 100%"
            :max-height="300"
            empty-text="暂无数据"
            header-row-class-name="table-header"
          >
            <el-table-column label="条件标签">
              <template #default="{ row }">
                <div class="source-wrap">
                  <div>{{row.tagName}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="条件">
              <template #default="{ row }">
                <el-select
                  v-model="row.condition"
                  placeholder="条件值集"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                    v-for="item in conditionOptions"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="条件值">
              <template #default="{ row, $index }">
                <div class="source-wrap">
                  <el-input
                    v-model="row.conditionValue"
                    placeholder="自定条件值"
                  />
                  <el-button
                    type="primary"
                    @click="handleSelectCondition($index)"
                  >选择</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="130"
              label="操作"
            >
              <template #default="{ $index }">
                <div class="active-wrap">
                  <span
                    @click="handleEmptyValidate($index)"
                    class="active-item-wrap"
                  >清空</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="source-tag-wrap">
        <div class="label-wrap">
          <p>动作</p>
        </div>
        <div class="table-wrap">
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="handleAddItem('actionList')"
            >新增动作</el-button>
          </div>
          <el-table
            :data="ruleForm.actionList"
            style="width: 100%"
            :max-height="300"
            empty-text="暂无数据"
            header-row-class-name="table-header"
          >
            <el-table-column label="资源类型">
              <template #default="{ row }">
                <el-select
                  v-model="row.sourceId"
                  placeholder="已添加资源类型范围"
                >
                  <el-option
                    :label="item.sourceType.name"
                    :value="item.sourceType.id"
                    :key="item.sourceType.id"
                    v-for="item in ruleForm.source"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="动作类型"
            >
              <template #default="{ row }">
                <el-input
                  v-model="row.actionType"
                  placeholder="自定动作类型"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="动作"
            >
              <template #default="{ row }">
                <el-input
                  v-model="row.action"
                  placeholder="自定动作"
                />
              </template>
            </el-table-column>
            <el-table-column
              width="130"
              label="操作"
            >
              <template #default="{ $index }">
                <div class="active-wrap">
                  <span
                    @click="handleCopyItem('actionList', $index)"
                    class="active-item-wrap"
                  >复制</span>
                  <span
                    @click="handleDeleteValidate('actionList', $index)"
                    class="active-item-wrap"
                  >删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <EntSelect
      :entDialog="entDialog"
      @handleEntSelect="handleEntSelect"
      v-if="entDialog.visible"
    />
    <ResourceSelect
      :resourceDialog="resourceDialog"
      @handleResourceSelect="handleResourceSelect"
      v-if="resourceDialog.visible"
    />
    <BusinessSelect
      :businessDialog="businessDialog"
      @handleBusinessSelect="handleBusinessSelect"
      v-if="businessDialog.visible"
    />
    <ConditionSelect
      :conditionDialog="conditionDialog"
      @handleConditionSelect="handleConditionSelect"
      v-if="conditionDialog.visible"
    />
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
import { onMounted, ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Http as request } from '@/assets/http/';
import api from '@/pages/index/index/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import EntSelect from '../../components/EntSelect/index.vue';
import ResourceSelect from '../../components/ResourceSelect/index.vue';
import BusinessSelect from '../../components/BusiSelect/index.vue';
import ConditionSelect from '../../components/ConditionValueSelect/index.vue';

export default {
  name: 'StrategyEdit',
  components: {
    EntSelect,
    ResourceSelect,
    BusinessSelect,
    ConditionSelect,
  },
  setup() {
    const Router = useRouter();
    const Route = useRoute();

    console.log(Route);

    // 企业选择器参数
    const entDialog = ref({
      singleSelect: false,
      visible: false,
      selectedData: [],
    });

    // 资源选择器参数
    const resourceDialog = ref({
      singleSelect: true,
      visible: false,
      index: -1,
    });

    // 业务选择器参数
    const businessDialog = ref({
      singleSelect: true,
      visible: false,
      selectedData: [],
    });

    // 业务选择器参数
    const conditionDialog = ref({
      singleSelect: true,
      visible: false,
      index: -1,
      selectedData: [],
    });

    // 业务的options
    const businessOptions = ref([]);

    // 条件的options
    const conditionOptions = ref([]);

    // 主体条件的options
    const mainConditionOptions = ref([]);

    // form节点
    const customForm = ref(null);

    // 企业节点
    const entRef = ref(null);

    // 表单数据
    const ruleForm = ref({
      description: '', // 描述
      business: [], // 所属业务
      businessStr: '',
      entInfo: [], // 所属企业
      strategyLogic: false,
      source: [],
      roleList: [],
      entInfoStr: '',
      conditionList: [],
      actionList: [],
    });

    // form 验证
    const rules = ref({
      description: [
        { required: true, message: '请输入策略描述', trigger: 'blur' },
      ],
      business: [
        { required: true, message: '请选择所属业务', trigger: 'change' },
      ],
      entInfo: [
        { required: true, message: '请选择所属企业', trigger: 'change' },
      ],
      strategyLogic: [
        { required: true, message: '请选择所属企业', trigger: 'change' },
      ],
    });

    // 处理交集
    const handleRenderTags = () => {
      /* eslint-disable */
      const list = ruleForm.value.source;
      let res = list[0].sourceType.tags;
      for (let i = 1; i < list.length; i += 1) {
        res = [
          ...new Set(
            res.filter((item) =>
              list[i].sourceType.tags.some(
                (element) => item.tagName === element.tagName,
              ),
            ),
          ),
        ];
      }

      for (let i = 1; i < ruleForm.value.conditionList.length; i += 1) {
        if (
          !res.some(
            (item) => item.tagName === ruleForm.value.conditionList[i].tagName,
          )
        ) {
          ruleForm.value.conditionList.splice(i, 1);
        }
      }

      for (let i = 1; i < res.length; i += 1) {
        if (
          !ruleForm.value.conditionList.some(
            (item) => item.tagName === res[i].tagName,
          )
        ) {
          ruleForm.value.conditionList.push({
            tagName: res[i].tagName,
            id: '',
            conditionValue: '',
            condition: '',
          });
        }
      }
      /* eslint-enable */
    };

    // 打开条件值选择弹窗
    const handleSelectCondition = (index) => {
      conditionDialog.value.visible = true;
      console.log(index);
      conditionDialog.value.index = index;
    };

    // 打开企业选择器
    const handleOpenModal = () => {
      entDialog.value.visible = true;
      entDialog.value.selectedData = ruleForm.value.entInfo;
    };

    // 打开业务选择器
    const handleOpenBusinessModal = () => {
      businessDialog.value.visible = true;
      businessDialog.value.selectedData = [ruleForm.value.business];
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

      if (selectData && selectData.length) {
        [ruleForm.value.business] = selectData;
        ruleForm.value.businessStr = handleRenderEnt(selectData);
      }

      businessDialog.value.visible = visible;
    };

    // 选择企业
    const handleEntSelect = (params: any): any => {
      const { selectData, visible } = params;
      if (selectData && selectData.length) {
        ruleForm.value.entInfo = selectData;
        ruleForm.value.entInfoStr = handleRenderEnt(ruleForm.value.entInfo);
      }
      entDialog.value.visible = visible;
    };

    // 选择条件值
    const handleConditionSelect = (params) => {
      const { visible, selectData } = params;
      const { index } = conditionDialog.value;
      console.log(index, 232332);
      conditionDialog.value.visible = visible;
      console.log(selectData);

      if (selectData) {
        console.log(ruleForm.value);

        // eslint-disable-next-line
        ruleForm.value.conditionList[index].conditionValue +=
          selectData[0].name;
      }
    };

    const handleSelectResource = (index) => {
      resourceDialog.value.visible = true;
      resourceDialog.value.index = index;
    };

    const handleResourceSelect = (params: any): any => {
      const { selectData, visible, index } = params;
      if (selectData && selectData.length) {
        const { sourceType, sourceKey, sourceTag } = selectData[0];
        ruleForm.value.source[index].sourceType.name = sourceType;
        ruleForm.value.source[index].sourceType.id = sourceKey;
        ruleForm.value.source[index].sourceType.tags = sourceTag;
        handleRenderTags();
      }

      resourceDialog.value.visible = visible;
    };

    // 获取条件值集
    const getConditionList = async () => {
      const res: any = await request.get(api.getConditionList);
      const { code, data, message } = res;
      if (code !== 200) {
        ElMessage.error(message);
        return;
      }
      conditionOptions.value = data.list;
    };

    // 获取条件值集
    const getMainConditionList = async () => {
      const res: any = await request.get(api.getMainConditionList);
      const { code, data, message } = res;
      if (code !== 200) {
        ElMessage.error(message);
        return;
      }
      mainConditionOptions.value = data.list;
    };

    // 新增标签
    const handleAddItem = (type) => {
      const obj = {
        source: {
          id: '',
          sourceType: {
            id: '',
            name: '',
            tags: [],
          },
          sourceExample: '',
        },
        roleList: {
          mainType: 'role(角色)',
          mainCondition: '',
          mainValue: '',
          id: '',
        },
        actionList: {
          sourceType: '',
          sourceId: '',
          id: '',
          actionType: '',
          action: '',
        },
      };
      if (type === 'source') {
        handleSelectResource(ruleForm.value.source.length);
      }
      if (type === 'actionList') {
        if (!ruleForm.value.source.length) {
          ElMessage.error('请先选择资源');
          return;
        }
      }
      ruleForm.value[type].push(JSON.parse(JSON.stringify(obj[type])));
    };

    const handleDeleteItem = (type, index) => {
      ruleForm.value[type].splice(index, 1);
      handleRenderTags();
    };

    // 删除标签
    const handleDeleteValidate = (type, index) => {
      const obj = {
        source: '资源',
        roleList: '角色',
        actionList: '动作',
      };
      ElMessageBox.confirm(`确定删除该${obj[type]}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        handleDeleteItem(type, index);
      });
    };

    const handleCopyItem = (type, index) => {
      const item = ruleForm.value[type][index];
      item.id = '';
      ruleForm.value[type].push(JSON.parse(JSON.stringify(item)));
    };

    const handleEmptyItem = (index) => {
      ruleForm.value.conditionList[index].conditionValue = '';
      ruleForm.value.conditionList[index].condition = '';
    };

    // 清空条件
    const handleEmptyValidate = (index) => {
      ElMessageBox.confirm('确定清空该条件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        handleEmptyItem(index);
      });
    };

    // 返回
    const goBack = () => {
      Router.go(-1);
    };

    // 保存资源类型
    const saveResourceType = () => {
      const result: any = request.post(api.saveResourceType, ruleForm);
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.message);
      goBack();
    };

    // 验证各条数据是否都有填写了数据
    const handleValidateData = () => {
      let flag = true;
      const temp = JSON.parse(JSON.stringify(ruleForm.value));
      delete temp.businessStr;
      delete temp.entInfoStr;
      const list = Object.keys(temp);

      for (let i = 0; i < list.length; i += 1) {
        if (typeof ruleForm.value[list[i]] === 'object') {
          if (!ruleForm.value[list[i]].length) {
            flag = false;
            break;
          }
          for (let j = 0; j < ruleForm.value[list[i]].length; j += 1) {
            const arr = Object.keys(ruleForm.value[list[i]][j]);
            for (let o = 0; o < arr.length; o += 1) {
              if (
                ruleForm.value[list[i]][j][arr[o]] === 'string' && // eslint-disable-line
                ruleForm.value[list[i]][j][arr[o]] === ''
              ) {
                flag = false;
                break;
              }
            }
          }
        }
      }
      return flag;
    };

    // 保存
    const handleSave = () => {
      customForm.value.validate((valid) => {
        if (valid && handleValidateData()) {
          console.log(233);
        } else {
          ElMessage.error('信息填写不完整');
        }
      });
    };

    onMounted(async () => {
      customForm.value.resetFields();
      await getConditionList();
      await getMainConditionList();
    });

    return {
      entDialog,
      resourceDialog,
      customForm,
      entRef,
      ruleForm,
      rules,
      businessDialog,
      businessOptions,
      conditionOptions,
      mainConditionOptions,
      conditionDialog,
      handleOpenModal,
      handleEntSelect,
      handleDeleteValidate,
      handleEmptyValidate,
      handleAddItem,
      goBack,
      saveResourceType,
      handleSave,
      handleResourceSelect,
      handleSelectResource,
      handleCopyItem,
      handleOpenBusinessModal,
      handleBusinessSelect,
      handleSelectCondition,
      handleConditionSelect,
    };
  },
};
</script>

<style scoped lang='less'>
@import '../Resources/edit/index.less';
:deep(.table-header) {
  th,
  tr {
    background-color: #f6f6f6;
  }
}
.source-wrap {
  display: flex;
  align-items: center;
  div {
    width: 80%;
  }
}
.source-tag-wrap {
  margin-bottom: 10px;
}
</style>
