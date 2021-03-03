/*
 * @Author: libf
 * @Date: 2021-01-27 13:37:24
 * @Last Modified by: libf
 * @Last Modified time: 2021-03-03 10:16:54
 */
<template>
  <div class="ent-select">
    <el-dialog
      title="选择业务"
      :model-value="businessDialog.visible"
      destroy-on-close
      width="600px"
      @close="handleCloseModal(false)"
    >
      <el-tree
        :data="businessList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :check-strictly="true"
        @check="handleCheckChange"
      ></el-tree>

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
import { onMounted, reactive, ref } from 'vue';
import { Http as request } from '@/assets/http/index';
import { ElMessage } from 'element-plus';
import api from '../../utils/api';

export default {
  name: 'BusinessSelect',
  props: {
    businessDialog: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const businessList = ref([]); // 企业列表
    let selectEnt: Partial<EntItem>[] = reactive([]); // 选中的企业列表
    const loading = ref(true);
    const tree = ref(null);

    // 处理获取业务数据
    const handleRenameData = (list) => {
      /* eslint-disable */
      for (let i = 0; i < list.length; i += 1) {
        list[i].value = list[i].id;
        list[i].label = list[i].name;
        if (list[i].list) {
          list[i].children = list[i].list;
          delete list[i].list;
          handleRenameData(list[i].children);
        }
      }
      /* eslint-enable */
      return list;
    };

    // 获取业务列表
    const getBusinessList = async (): Promise<void> => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        const { code, data, message } = await request.get(api.getBusinessList);
        if (code !== 200) {
          ElMessage.error(message);
          return;
        }
        // 获取回数据后，根据选中的内容设置选中
        businessList.value = handleRenameData(data);
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
            selectData: selectEnt,
          }
        : { visible: false };
      /* eslint-enable */
      context.emit('handleBusinessSelect', param);
    };

    const setCheckedKeys = (selectedData) => {
      const list = selectedData.map((item) => item.id);
      tree.value.setCheckedKeys(list);
    };

    const handleCheckChange = (value) => {
      const { businessDialog } = props;
      const { singleSelect } = businessDialog;
      if (value.children) {
        setCheckedKeys(selectEnt);
        return;
      }

      if (singleSelect) {
        if (selectEnt.some((item) => item.id === value.id)) {
          selectEnt = selectEnt.filter((item) => item.id !== value.id);
        } else {
          selectEnt = [value];
        }
      }
      if (!singleSelect) {
        if (selectEnt.some((item) => item.id === value.id)) {
          selectEnt = selectEnt.filter((item) => item.id !== value.id);
        } else {
          selectEnt.push(value);
        }
      }

      setCheckedKeys(selectEnt);
    };

    onMounted(async () => {
      const { businessDialog } = props;
      const { selectedData } = businessDialog;
      if (selectedData) {
        selectEnt = selectedData;
      }

      await getBusinessList();
      setCheckedKeys(selectEnt);
      loading.value = false;
    });

    return {
      businessList,
      handleCloseModal,
      getBusinessList,
      loading,
      handleCheckChange,
      tree,
    };
  },
};
</script>
<style lang="less" scoped>
:deep(td.select-wrap) {
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
:deep(.el-dialog__body) {
  padding: 15px 20px;
  height: 400px;
  overflow: auto;
}
</style>
