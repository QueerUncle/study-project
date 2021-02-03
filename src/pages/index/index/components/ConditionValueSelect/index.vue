/*
 * @Author: libf
 * @Date: 2021-01-27 13:37:24
 * @Last Modified by: libf
 * @Last Modified time: 2021-02-03 14:49:24
 */
<template>
  <div class="ent-select">
    <el-dialog
      title="选择条件值"
      :model-value="conditionDialog.visible"
      destroy-on-close
      width="600px"
      @close="handleCloseModal(false)"
    >
      <el-select
        v-model="selectId"
        v-if="selectEnt.length"
        placeholder="条件值"
        @change="handleSelectItem"
      >
        <el-option
          :label="item.id"
          :value="item.id"
          :key="item.id"
          v-for="item in conditionOptions"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCloseModal(false)">取 消</el-button>
          <el-button
            type="primary"
            @click="handleCloseModal(true)"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { Http as request } from '@/assets/http/index';
import { ElMessage } from 'element-plus';
import api from '../../utils/api';

export default {
  name: 'ConditionSelect',
  props: {
    conditionDialog: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const conditionOptions = ref([]); // 企业列表
    const selectEnt = ref([]); // 选中的企业列表
    const loading = ref(true);
    const selectId = ref('');

    // 获取业务列表
    const getConditionList = async (): Promise<void> => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        const { code, data, message } = await request.get(
          api.getConditionValueList,
        );
        if (code !== 200) {
          ElMessage.error(message);
          return;
        }

        // 获取回数据后，根据选中的内容设置选中
        conditionOptions.value = data;
      } catch (error) {
        ElMessage.error(error);
      }
    };

    /**
     * 关闭弹窗
     * @param {boolean} flag true是关闭 false是确定
     */
    const handleCloseModal = (flag: boolean): void => {
      /* eslint-disable */
      const param = flag
        ? {
            visible: false,
            selectData: selectEnt.value,
          }
        : { visible: false };
      /* eslint-enable */
      console.log(param);
      context.emit('handleConditionSelect', param);
    };

    const handleSelectItem = (value) => {
      selectEnt.value[0].id = value;
      selectEnt.value[0].name = value;
    };

    onMounted(async () => {
      const { conditionDialog } = props;
      const { selectedData } = conditionDialog;
      console.log(toRaw(selectedData), 232323);
      if (toRaw(selectedData).length) {
        selectEnt.value = selectedData;
      } else {
        selectEnt.value = [{ id: '', name: '' }];
      }
      await getConditionList();
      loading.value = false;
    });

    return {
      conditionOptions,
      handleCloseModal,
      handleSelectItem,
      loading,
      selectEnt,
      selectId,
    };
  },
};
</script>
<style lang="less" scoped>
/deep/td.select-wrap {
  display: flex;
  justify-content: center;
  .el-radio__label {
    display: none !important;
  }
}
.page-info {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
/deep/.el-dialog__body {
  padding: 15px 20px;
}
</style>
