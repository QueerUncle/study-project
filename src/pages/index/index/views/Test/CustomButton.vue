<!--
  @Author: lize
  @Date: 2021/3/12
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/12
 -->
<template>
  <div class="custom-button-wrap" @click = "buttonClick">我是button按钮</div>
</template>

<script lang='ts'>
export default {
  name: 'CustomButton',
  emits: ['click'],
  setup(props, context) {
    const buttonClick = (event) => {
      context.emit('click', event);
    };

    return {
      buttonClick,
    };
  },
};
</script>

<style scoped lang='less'>
.custom-button-wrap{
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    color: #42b983;
    border-color:#42b983;
  }
}
</style>
