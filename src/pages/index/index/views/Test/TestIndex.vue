<!--
  @Author: lize
  @Date: 2021/3/4
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/4
 -->
<template>
  <div class="test-wrap">
    <div class = "box-new-wrap">
      <div
        v-for="(item, index) in list"
        :key = "index"
        :style = "{
          width: `${scaleq ? scaleq * item.width : item.width}px`,
          height: `${scaleq ? scaleq * item.height : item.height}px`,
          left: `${scaleq ? scaleq * item.left : item.left}px`,
          top: `${scaleq ? scaleq * item.top : item.top}px`,
          // transform: `${scaleq ? `scale(${scaleq})` : false}`
        }"
        class = "item-wrap" />
    </div>
    <div class = "box-old-wrap">
      <div
        v-for="(item, index) in list"
        :key = "index"
        :style = "{
          width: `${item.width}px`,
          height: `${item.height}px`,
          left: `${item.left}px`,
          top: `${item.top}px`,
        }"
        class = "item-wrap" />
    </div>
  </div>
</template>

<script lang='ts'>
import {
  onMounted, reactive, ref, getCurrentInstance,
} from 'vue';

export default {
  name: 'TestIndex',
  setup() {
    console.log(getCurrentInstance());
    const list = reactive([
      {
        key: '1',
        width: 100,
        height: 100,
        left: 12,
        top: 12,
      },
      {
        key: '2',
        width: 100,
        height: 100,
        left: 122,
        top: 12,
      },
    ]);
    console.log(list);
    const scaleq = ref(10);
    console.log(scaleq);
    onMounted(() => {
      if (document.body.clientWidth > 1440) {
        scaleq.value = document.body.clientWidth / 1440;
      }
      console.log(scaleq.value);
    });
    return {
      scaleq,
      list,
    };
  },
};
</script>

<style scoped lang='less'>
.test-wrap{
  width: 100%;
  height: 100%;
  .box-new-wrap{
    width: 100%;
    height: 50%;
    background: red;
    position: relative;
  }
  .box-old-wrap{
    width: 1440px;
    height: 50%;
    background: pink;
    margin: 0 auto;
    position: relative;
  }
  .item-wrap{
    position: absolute;
    background: #409EFF;
  }
}
</style>
