<!--
  @Author: lize
  @Date: 2021/1/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/27
 -->
<template>
  <div class="resources-list-page-wrap">
    <div class = "resources-header-title-wrap">策略管理-资源类型管理</div>
    <div class = "resources-header-search-wrap"></div>
    <div class = "resources-content-wrap">
      <div class = "content-search-wrap"></div>
      <div class = "content-table-wrap"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { onMounted, reactive, getCurrentInstance } from 'vue';

export default {
  name: 'ResourcesList',
  setup(props, context) {
    console.log(props, context);
    onMounted(() => {
      console.log('我是mounted');
    });

    return {};
  },
};
</script>

<style scoped lang='less'>
@import "./index.less";
</style>
