/*
 * @Author: libf
 * @Date: 2021-01-27 13:37:24
 * @Last Modified by: libf
 * @Last Modified time: 2021-01-27 16:06:01
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
          width="60"
          class-name="select-wrap"
        >
          <template #default="scope">
            <el-radio
              v-model="scope.row.selected"
              v-if="entDialog.singleSelect"
              @change="handleSelectItem(scope.row)"
            />
            <el-checkbox
              v-model="scope.row.selected"
              v-if="!entDialog.singleSelect"
              @change="handleSelectItem(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          width="60"
        >
          <template #default="scope">{{ (pageNum-1)*pageSize+(scope.$index+1) }}</template>
        </el-table-column>
        <el-table-column
          property="name"
          label="企业名称"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNum"
        :pager-count="5"
        :total="total"
        @current-change="handleChangePage"
      ></el-pagination>
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

export default {
  name: 'EntSelect',
  props: {
    entDialog: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const entList: Partial<EntItem>[] = reactive([
      {
        id: '1',
        name: '大企业',
        selected: false,
      },
      {
        id: '2',
        name: '小企业',
        selected: false,
      },
    ]); // 企业列表
    let selectEnt: Partial<EntItem>[] = reactive([]); // 选中的企业列表
    const pageSize = 10;
    const pageNum = ref(1);
    const total = ref(32);

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

    const handleSelectItem = (data) => {
      const { entDialog } = props;
      const { singleSelect } = entDialog;
      if (singleSelect) {
        selectEnt.length = 0;
        selectEnt.push(data);
        for (let i = 0; i < entList.length; i += 1) {
          if (entList[i].id !== data.id) {
            entList[i].selected = false;
          }
        }
      } else {
        // eslint-disable-next-line
        if (data.selected) {
          selectEnt.push(data);
        } else {
          selectEnt = reactive(selectEnt.filter((item) => item.id !== data.id));
        }
      }
      console.log(selectEnt, 23333);
    };

    const handleChangePage = (page) => {
      console.log(page);
      pageNum.value = page;
    };

    return {
      entList,
      total,
      handleCloseModal,
      pageSize,
      pageNum,
      handleSelectItem,
      handleChangePage,
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
</style>
