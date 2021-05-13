<!--
  @Author: lize
  @Date: 2021/5/13
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/13
 -->
<template>
  <div class="select-wrap">
    <el-select v-model="selectValue" placeholder="请选择" @change = "selectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch } from 'vue';

export default {
  name: 'index',
  props: {
    modelValue: Object,
  },
  emits: ['update:modelValue'],
  setup(props, ctx) { // eslint-disable-line
    const options = reactive([
      {
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }]);
    const selectValue = ref('');
    watch(
      () => props.modelValue,
      (newValue) => {
        if (!Object.keys(newValue).length || newValue.value === selectValue.value) return;
        console.log(newValue, '我是子组件打印的');
        selectValue.value = newValue.value;
      },
      { immediate: true, deep: true },
    );
    const selectChange = (value) => {
      const target = options.filter((item) => item.value === value);
      if (!target || !target.length) return;
      ctx.emit('update:modelValue', target[0]);
    };
    return {
      options,
      selectValue,
      selectChange,
    };
  },
};
</script>

<style scoped lang="less">

</style>
