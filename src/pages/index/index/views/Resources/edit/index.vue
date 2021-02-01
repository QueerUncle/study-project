<!--
  @Author: lize
  @Date: 2021/1/27
  @Description :资源类型编辑页面
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/27
 -->
<template>
  <div class="resources-edit-wrap custom-class-wrap">
    <div class="custom-header-title-wrap">策略管理-资源类型管理-资源类型编辑</div>
    <div class="custom-header-search-wrap">
      <div class = "search-left-wrap"/>
      <div class = "search-right-wrap">
        <el-button size='small' type="primary" @click = "handlerBack">返回</el-button>
        <el-button :disabled="isRechecking" size='small' type="primary" @click = "handlerSave">
          保存
        </el-button>
      </div>
    </div>
    <div class = "resources-edit-content-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="customForm" label-width="120px">
        <el-form-item label="类型描述" prop="sourceType">
          <el-input style="width: 60%" v-model="ruleForm.sourceType" placeholder="类型描述" />
        </el-form-item>
        <el-form-item label="类型key" prop="sourceKey">
          <div style="display: flex;align-items: center;">
            <el-input
              @change="handlerChange"
              style="margin-right: 20px;width: 60%"
              v-model="ruleForm.sourceKey"
              placeholder="类型key" />
            <el-button size='mini' type="primary" @click = "handlerRechecking(ruleForm.sourceKey)">
              查重
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="所属业务" prop="businessStr">
          <div style="display: flex;align-items: center;">
            <el-input
              style="margin-right:20px;width:60%;height: 40px;"
              readonly
              v-model="ruleForm.businessStr"
              placeholder="请选择资源所属业务"/>
            <el-button size='mini' type="primary" @click = "handleOpenBusinessModal">
              选择业务
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="所属企业" prop="entInfoStr">
          <div style="display: flex;align-items: center;">
            <el-input
              style="margin-right:20px;width:60%;height: 40px;"
              readonly
              v-model="ruleForm.entInfoStr"
              placeholder="所属企业列表可复选"/>
            <el-button size='mini' type="primary" @click = "handleOpenModal">选择企业</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class = "source-tag-wrap">
        <div class = "label-wrap"><p>类型标签</p></div>
        <div class = "table-wrap">
          <div class = "btn-wrap">
            <el-button size='mini' type="primary" @click = "handlerAddTag">新增类型标签</el-button>
          </div>
          <el-table :data="ruleForm.sourceTag" style="width: 100%" :max-height = "300">
            <el-table-column label="序号" width="80">
              <template #default="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="标签key">
              <template #default="{ row }">
                <el-input v-model="row.tagName" placeholder="资源类型key" />
              </template>
            </el-table-column>
            <el-table-column prop="address" label="标签类型">
              <template #default="{ row }">
                <el-select v-model="row.tagType" placeholder="请选择策略所属业务">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="描述">
              <template #default="{ row }">
                <el-input v-model="row.description" placeholder="标签描述" />
              </template>
            </el-table-column>
            <el-table-column prop="address" label="重复">
              <template #default="{ row }">
                <el-checkbox disabled v-model="row.hasRepeated"/>
              </template>
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template #default="{ $index }">
                <div class = "active-wrap" >
                  <span @click = "handlerDel($index)" class = "active-item-wrap">删除</span>
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
      v-if="entDialog.visible"/>
    <BusiSelect
      :businessDialog="businessDialog"
      @handleBusinessSelect="handleBusinessSelect"
      v-if="businessDialog.visible"
    />
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Http } from '@/assets/http/';
import Api from '@/pages/index/index/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import EntSelect from '../../../components/EntSelect/index.vue';
import BusiSelect from '../../../components/BusiSelect/index.vue';

export default {
  name: 'ResourcesEdit',
  components: {
    EntSelect,
    BusiSelect,
  },
  setup(props, context) {
    console.log(props, context);
    const Router = useRouter();
    const Route = useRoute();

    // 是否可以查重
    const isRechecking = ref(true);

    // 企业选择器参数
    const entDialog = ref({
      singleSelect: false,
      visible: false,
    });

    // 业务选择器参数
    const businessDialog = ref({
      singleSelect: false,
      visible: false,
      selectedData: [],
    });

    // form节点
    const customForm = ref(null);

    // 表单数据
    const ruleForm = ref({
      id: '',
      sourceType: '', // 类型描述
      sourceKey: '', // 资源类型key
      business: [], // 所属业务
      businessStr: '', // 所属业务Str
      entInfo: [], // 所属企业
      sourceTag: [], // 资源标签
      entInfoStr: '', // 所属企业Str
    });

    // form 验证
    const rules = ref({
      sourceType: [
        { required: true, message: '请输入类型描述', trigger: 'blur' },
      ],
      sourceKey: [
        { required: true, message: '请输入资源类型key', trigger: 'blur' },
      ],
      businessStr: [
        { required: true, message: '请选择所属业务', trigger: 'change' },
      ],
      entInfoStr: [
        { required: true, message: '请选择所属企业', trigger: 'change' },
      ],
    });

    // 查重
    const handlerRechecking = async (key): Promise<any> => {
      if (!key) {
        ElMessage.error('请先填写类型key');
        return false;
      }
      const result: any = await Http.post(Api.Rechecking, { key });
      if (!result.success) {
        ElMessage.error(result.message);
        return false;
      }
      ElMessage.success('可以使用！');
      isRechecking.value = false;
      return true;
    };

    // 资源类型key发生变化
    const handlerChange = () => {
      isRechecking.value = true;
    };

    // 打开企业选择器
    const handleOpenModal = () => {
      entDialog.value.visible = true;
    };

    // 选择企业
    const handleEntSelect = (params: any): any => {
      ruleForm.value.entInfo = params.selectData;
      let str = '';
      for (let i = 0; i < params.selectData.length; i += 1) {
        str += `${params.selectData[i].name}，`;
      }
      ruleForm.value.entInfoStr = str;
      entDialog.value.visible = params.visible;
    };
    // 打开业务选择器
    const handleOpenBusinessModal = () => {
      businessDialog.value.visible = true;
      businessDialog.value.selectedData = ruleForm.value.business;
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
        ruleForm.value.business = selectData; // eslint-disable-line
        ruleForm.value.businessStr = handleRenderEnt(ruleForm.value.business);
      }
      businessDialog.value.visible = visible;
    };

    // 新增标签
    const handlerAddTag = () => {
      ruleForm.value.sourceTag.push({
        tagName: '',
        tagType: '',
        description: '',
        hasRepeated: false,
      });
    };

    // 删除标签
    const handlerDel = (index: number) => {
      ElMessageBox.confirm('确定删除该条标签？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        ruleForm.value.sourceTag.splice(index, 1);
      });
    };

    // 返回
    const handlerBack = () => {
      Router.go(-1);
    };

    // 保存资源类型
    const saveResourceType = () => {
      const result: any = Http.post(Api.saveResourceType, ruleForm.value);
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.message);
      handlerBack();
    };

    // 保存
    const handlerSave = () => {
      customForm.value.validate((valid) => {
        if (valid) {
          if (!ruleForm.value.sourceTag.length) {
            ElMessage.error('请添加类型标签。');
            return;
          }

          const { sourceTag } = ruleForm.value;
          for (let i = 0; i < sourceTag.length; i += 1) {
            if (!sourceTag[i].tagName || !sourceTag[i].tagType || !sourceTag[i].description) {
              ElMessage.error('类型标签内有空值，请输入后在保存');
              return;
            }
          }
          saveResourceType();
        }
      });
    };

    // 获取该条资源详情
    const getResourcesDetail = async () => {
      if (!Route.query.id) return;
      const result: any = await Http.post(Api.getResourcesDetail, { id: Route.query.id });
      if (!result.success) {
        ElMessage.error(result.message);
        return;
      }
      Object.assign(ruleForm.value, result.data);
      if (ruleForm.value.entInfo.length) {
        let str = '';
        for (let i = 0; i < ruleForm.value.entInfo.length; i += 1) {
          str += `${ruleForm.value.entInfo[i].name}，`;
        }
        ruleForm.value.entInfoStr = str;
      }
      isRechecking.value = false;
    };

    onMounted(() => {
      customForm.value.resetFields();
      getResourcesDetail();
    });

    return {
      entDialog,
      businessDialog,
      customForm,
      ruleForm,
      rules,
      isRechecking,
      handleOpenBusinessModal,
      handleBusinessSelect,
      getResourcesDetail,
      handlerChange,
      handlerRechecking,
      handleOpenModal,
      handleEntSelect,
      handlerDel,
      handlerAddTag,
      handlerBack,
      saveResourceType,
      handlerSave,
    };
  },
};
</script>

<style scoped lang='less'>
@import './index';
</style>
