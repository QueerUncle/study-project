<!--
  @Author: lize
  @Date: 2021/5/13
  @Description : 自定义表单
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/13
 -->
<template>
  <div class="custom-form-wrap">
    <div v-for="(item, index) in templateAry" :key = "index">
      <SelectCom
        v-model = "dataObj[item.id]"
        v-if="item.type ==='select'" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watch } from 'vue';
import SelectCom from '../components/SelectCom/index.vue';

export default {
  name: 'CustomForm',
  components: { SelectCom },
  props: {
    modelValue: Array,
  },
  setup() { // eslint-disable-line
    const templateAry = reactive([
      {
        type: 'select',
        id: 'selectOne',
      },
    ]);
    const dataObj = reactive({
      selectOne: {},
    });
    setTimeout(() => {
      dataObj.selectOne = {
        value: '选项1',
        label: '黄金糕',
      };
    }, 1000);
    watch(
      () => dataObj,
      (newValue) => {
        console.log(newValue, ' 我是父组件打印的');
      },
      { deep: true },
    );
    return {
      templateAry,
      dataObj,
    };
  },
};
</script>

<style scoped lang="less">

</style>
