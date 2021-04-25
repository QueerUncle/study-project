<!--
  @Author: lize
  @Date: 2021/3/24
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/24
 -->
<template>
  <div class="">
  </div>
</template>

<script lang='ts'>
import { onMounted, reactive, getCurrentInstance } from 'vue';

export default {
  name: 'Asdfsdfsdf',
  setup() {
    const { ctx } = getCurrentInstance();
    console.log(ctx);
    onMounted(() => {
    });
    return {};
  },
};
</script>

<style scoped lang=''>

</style>
