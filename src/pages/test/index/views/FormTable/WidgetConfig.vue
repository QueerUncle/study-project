<!--
  @Author: lize
  @Date: 2021/6/4
  @Description : 右侧字段设置
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/4
 -->
<template>
  <div class="widget-config-wrap">
    <input
      v-if="SelectWidget"
      type="text"
      v-model = "SelectWidget.name">
  </div>
</template>
<script lang='ts'>
import { computed } from 'vue';

export default {
  name: 'WidgetConfig',
  props: {
    selectWidget: Object,
  },
  setup(props) {
    const SelectWidget = computed(() => props.selectWidget);
    return {
      SelectWidget,
    };
  },
};
</script>

<style scoped lang='less'>

</style>
