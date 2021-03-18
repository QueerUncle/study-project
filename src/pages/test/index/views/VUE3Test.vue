<!--
  @Author: lize
  @Date: 2021/3/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/18
 -->
<template>
  <div class="vue3-test-wrap">
    VUE3Test<br/>
    {{modelValue}}----{{fooValue}}
    <CustomInput v-model = "modelValue" v-model:foo = "fooValue"/>
  </div>
</template>

<script lang='ts'>
import { ref } from 'vue';
import CustomInput from '../components/CustomInput.vue';

export default {
  name: 'VUE3Test',
  components: { CustomInput },
  setup() {
    const modelValue = ref('李泽');
    const fooValue = ref('aaaaa');
    return {
      modelValue,
      fooValue,
    };
  },
};
</script>

<style scoped lang=''>

</style>
