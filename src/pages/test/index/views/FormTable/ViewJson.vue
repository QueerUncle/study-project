<!--
  @Author: lize
  @Date: 2021/5/30
  @Description : Json查看器
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/30
 -->
<template>
  <el-drawer
    title="我是标题"
    :model-value="viewJsonOptions.visible"
    :before-close="handleClose"
    destroy-on-close>
    <json-viewer
      style="height: 100%"
      :expand-depth='5'
      :key="JSON.stringify(viewJsonOptions.data)"
      :value="viewJsonOptions.data" copyable boxed />
  </el-drawer>
</template>
<script lang='ts'>
import { reactive } from 'vue';
export default {
  name: 'ViewJson',
  props: {
    viewJsonOptions: {
      type: Object,
      default: () => ({
        visible: false,
        data: {},
      }),
    },
    TemplateList: Array,
    FormValues: Object,
  },
  setup(props) {
    const ViewJsonOptions = reactive(props.viewJsonOptions);
    const ViewJsonData = JSON.parse(JSON.stringify({
      TemplateList: props.TemplateList,
      FormValues: props.FormValues,
    }));
    const handleClose = () => {
      ViewJsonOptions.visible = false;
    };
    return {
      handleClose,
      ViewJsonData,
    };
  },
};
</script>

<style scoped lang='less'>
:deep(.boxed){
  max-height: 100% !important;
  overflow: auto !important;
}
</style>
