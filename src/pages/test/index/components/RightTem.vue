<!--
  @Author: lize
  @Date: 2021/3/17
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/17
 -->
<template>
  <div class="right-tem-wrap">
    <div class = "box-wrap" @drop="drop" />
    <div class = "box-wrap" style="margin-top: 20px" @drop="drop1" />
  </div>
</template>

<script lang='ts'>
// import { reactiv } from 'vue';

export default {
  name: 'RightTem',
  props: {
    draggableData: {
      type: Object || null,
    },
    getTargetData: Function,
  },
  setup(props) {
    // 拖拽结束的时候
    const drop = (event) => {
      console.log('drop', event, props.getTargetData());
    };
    // 拖拽结束的时候
    const drop1 = (event) => {
      console.log('drop11111', event, props.getTargetData());
    };
    return {
      drop,
      drop1,
    };
  },
};
</script>

<style scoped lang='less'>
.right-tem-wrap{
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #000000;
  .box-wrap{
    width: 200px;
    height: 100px;
    border: 1px solid #409EFF;
  }
}
</style>
