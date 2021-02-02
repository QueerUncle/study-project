/*
 * @Author: libf
 * @Date: 2021-01-27 13:37:24
 * @Last Modified by: libf
 * @Last Modified time: 2021-02-02 10:12:49
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
        height="300px"
        v-loading="loading"
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
      <section class="page-info">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageNum"
          :pager-count="5"
          :total="total"
          hide-on-single-page
          @current-change="handleChangePage"
        ></el-pagination>
      </section>

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
import { onMounted, reactive, ref, toRaw } from 'vue'; // eslint-disable-line
import { Http as request } from '@/assets/http/index';
import { ElMessage } from 'element-plus';
import api from '../../utils/api';

export default {
  name: 'EntSelect',
  props: {
    entDialog: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const entList = ref([]); // 企业列表
    let selectEnt: Partial<EntItem>[] = reactive([]); // 选中的企业列表
    const pageSize = 10; // 数据条数
    const pageNum = ref(1); // 当前页面
    const total = ref(0); // 总数
    const loading = ref(true);

    // 获取企业列表
    const getEntList = async (): Promise<void> => {
      const reqBody = {
        pageNum: pageNum.value,
        pageSize,
      };
      try {
        // eslint-disable-next-line
        // @ts-ignore
        const { code, data, message } = await request.post(
          api.getEntList,
          reqBody,
        );
        if (code !== 200) {
          ElMessage.error(message);
          return;
        }
        const { list, page } = data;
        // 获取回数据后，根据选中的内容设置选中
        for (let i = 0; i < list.length; i += 1) {
          if (selectEnt.findIndex((item) => item.id === list[i].id) !== -1) {
            list[i].selected = true;
          } else {
            list[i].selected = false;
          }
        }
        // 处理page相关
        total.value = page.total;
        pageNum.value = page.pageNum;
        entList.value = list;
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
      context.emit('handleEntSelect', param);
    };

    /**
     * 选中某一条数据
     * @param {*} data
     */
    const handleSelectItem = (data: EntItem): void => {
      const { entDialog } = props;
      const { singleSelect } = entDialog;
      // 单选
      if (singleSelect) {
        selectEnt.length = 0;
        selectEnt.push(data);
        for (let i = 0; i < entList.value.length; i += 1) {
          if (entList.value[i].id !== data.id) {
            entList.value[i].selected = false;
          }
        }
      } else {
        // 多选
        // eslint-disable-next-line
        if (data.selected) {
          // 选中就加进去
          selectEnt.push(data);
        } else {
          // 删除就在里面删除掉
          selectEnt = reactive(selectEnt.filter((item) => item.id !== data.id));
        }
      }
    };

    // 页数变更
    const handleChangePage = (page: number): void => {
      pageNum.value = page;
      getEntList();
    };

    onMounted(async () => {
      const { entDialog } = props;
      const { selectedData } = entDialog;
      if (selectedData && toRaw(selectedData).length) {
        selectEnt = selectedData;
      }
      await getEntList();
      loading.value = false;
    });

    return {
      entList,
      total,
      handleCloseModal,
      pageSize,
      pageNum,
      handleSelectItem,
      handleChangePage,
      getEntList,
      loading,
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
