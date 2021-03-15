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
<!--      <div-->
<!--        v-for="(item, index) in list"-->
<!--        :key = "index"-->
<!--        :style = "{-->
<!--          width: `${item.width}px`,-->
<!--          height: `${item.height}px`,-->
<!--          left: `${item.left}px`,-->
<!--          top: `${item.top}px`,-->
<!--        }"-->
<!--        class = "item-wrap" />-->
      <div class = "cbim-button-error" style="width: 100px;height: 100px;margin: 10px"></div>
      <div class = "cbim-button-success" style="width: 100px;height: 100px;margin: 10px"></div>
      <div class = "cbim-button-cbim" style="width: 100px;height: 100px;margin: 10px"></div>
      <CustomButton @click = "handleButtonClick" />
    </div>
  </div>
</template>

<script lang='ts'>
import {
  onMounted, reactive, ref, getCurrentInstance,
} from 'vue';

import CustomButton from './CustomButton.vue';

export default {
  name: 'TestIndex',
  components: { CustomButton },
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
    const handleButtonClick = (event) => {
      console.log(event);
    };
    onMounted(() => {
      if (document.body.clientWidth > 1440) {
        scaleq.value = document.body.clientWidth / 1440;
      }
      console.log(scaleq.value);
    });
    return {
      scaleq,
      list,
      handleButtonClick,
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

@button-error-color:red;
@button-success-color:#409EFF;
@button-cbim-color:black;
@selectColor: error , success , cbim;
each(@selectColor, {
  .cbim-button-@{value} {
    @var: ~'button-@{value}-color';
    background:@@var;
  }
})

</style>
