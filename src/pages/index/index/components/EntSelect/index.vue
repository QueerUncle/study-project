/*
 * @Author: libf
 * @Date: 2021-01-27 13:37:24
 * @Last Modified by: libf
 * @Last Modified time: 2021-01-27 15:02:05
 */
<template>
  <div class="ent-select">
    <el-dialog
      title="选择企业"
      :model-value="entDialog.visible"
      destroy-on-close
      width="600px"
      @close="handleCloseModal(false)"
    >
      <el-table
        :data="entList"
        border
      >
        <el-table-column
          property
          label
          width="60"
        ></el-table-column>
        <el-table-column
          property="index"
          label="序号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="企业名称"
          width="200"
        ></el-table-column>
      </el-table>
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
import { onMounted, reactive } from 'vue';

export default {
  name: 'EntSelect',
  props: {
    entDialog: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const entList: Partial<EntItem>[] = reactive([]); // 企业列表
    const selectEnt: Partial<EntItem>[] = reactive([]); // 选中的企业列表

    onMounted(() => {
      console.log(selectEnt);
    });

    const handleCloseModal = (flag: boolean): void => {
      /* eslint-disable */
      const param = flag
        ? {
            visible: false,
            selectData: [],
          }
        : { visible: false };
      /* eslint-enable */
      context.emit('handleEntSelect', param);
    };

    return { entList, handleCloseModal };
  },
};
</script>
<style lang="less" scoped>
</style>
