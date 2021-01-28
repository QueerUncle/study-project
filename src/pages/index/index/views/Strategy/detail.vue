/*
 * @Author: libf
 * @Date: 2021-01-28 10:36:15
 * @Last Modified by: libf
 * @Last Modified time: 2021-01-28 11:15:50
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
          @click="handlerBack"
        >返回</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handlerSave"
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
          prop="sourceType"
        >
          <el-input
            style="width: 55%"
            type="textarea"
            :rows="4"
            v-model="ruleForm.sourceType"
            placeholder="当前策略的简述信息"
          />
        </el-form-item>
        <el-form-item
          label="所属业务"
          prop="business"
        >
          <el-select
            style="width: 55%"
            v-model="ruleForm.business"
            placeholder="请选择策略所属业务"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属企业"
          prop="entInfo"
        >
          <div style="display: flex;align-items: center;">
            <el-input
              style="margin-right:20px;width: 55%"
              v-model="ruleForm.entInfo"
              placeholder="所属企业列表可复选"
            />
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenModal"
            >选择企业</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="source-tag-wrap">
        <div class="label-wrap">
          <p>类型标签</p>
        </div>
        <div class="table-wrap">
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="handlerAddTag"
            >新增类型标签</el-button>
          </div>
          <el-table
            :data="ruleForm.sourceTag"
            style="width: 100%"
            :max-height="300"
          >
            <el-table-column
              label="序号"
              width="80"
            >
              <template #default="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="标签key">
              <template #default="{ row }">
                <el-input
                  v-model="row.tagName"
                  placeholder="资源类型key"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="标签类型"
            >
              <template #default="{ row }">
                <el-select
                  v-model="row.tagType"
                  placeholder="请选择策略所属业务"
                >
                  <el-option
                    label="区域一"
                    value="shanghai"
                  ></el-option>
                  <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="描述"
            >
              <template #default="{ row }">
                <el-input
                  v-model="row.description"
                  placeholder="标签描述"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="重复"
            >
              <template #default="{ row }">
                <el-checkbox v-model="row.hasRepeated" />
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="操作"
            >
              <template #default="{ $index }">
                <div class="active-wrap">
                  <span
                    @click="handlerDel($index)"
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
  </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Http } from '@/assets/http/';
import Api from '@/pages/index/index/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import EntSelect from '../../components/EntSelect/index.vue';

export default {
  name: 'StrategyEdit',
  components: {
    EntSelect,
  },
  setup(props, context) {
    console.log(props, context);
    const Router = useRouter();
    const Route = useRoute();
    console.log(Route.query);
    // 企业选择器参数
    const entDialog = ref({
      singleSelect: true,
      visible: false,
    });

    // form节点
    const customForm = ref(null);

    // 表单数据
    const ruleForm = ref({
      sourceType: '', // 类型描述
      sourceKey: '', // 资源类型key
      business: [], // 所属业务
      entInfo: [], // 所属企业
      sourceTag: [], // 资源标签
    });

    // form 验证
    const rules = ref({
      sourceType: [
        { required: true, message: '请输入类型描述', trigger: 'blur' },
      ],
      sourceKey: [
        { required: true, message: '请输入资源类型key', trigger: 'blur' },
      ],
      business: [
        { required: true, message: '请选择所属业务', trigger: 'change' },
      ],
      entInfo: [
        { required: true, message: '请选择所属企业', trigger: 'change' },
      ],
    });

    // 查重
    const handlerRechecking = () => {
      console.log('查重');
    };

    // 打开企业选择器
    const handleOpenModal = () => {
      entDialog.value.visible = true;
    };

    // 选择企业
    const handleEntSelect = (params: any): any => {
      entDialog.value.visible = params.visible;
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
      const result: any = Http.post(Api.saveResourceType, ruleForm);
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
          saveResourceType();
        }
      });
    };

    onMounted(() => {
      console.log('mounted');
    });

    return {
      entDialog,
      customForm,
      ruleForm,
      rules,
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
@import '../Resources/edit/index.less';
</style>
