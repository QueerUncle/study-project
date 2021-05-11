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
    <CustomInput v-model = "modelValue" v-model:foo = "fooValue" :arr = "aloneCheckboxC"/>
<!--    <input name = "aaa" label = "ccccc" type="checkbox"-->
<!--    v-model = "checked" @change = "handleChange" />-->
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
    <CustomCheckboxGroup
      v-model="aloneCheckboxC"
      :disabled="false"
      @change="changeCheckboxGroup">
      <CustomCheckbox
        v-for="(item, index) in resData"
        :itemData="item"
        :label="item.value"
        :key="index">
          {{ item.label }}
      </CustomCheckbox>
    </CustomCheckboxGroup>
  </div>
</template>

<script lang='ts'>
import { ref, computed } from 'vue';
import CustomInput from '../components/CustomInput.vue';
import CustomCheckboxGroup from '../components/CheckboxCom/CustomCheckboxGroup.vue';
import CustomCheckbox from '../components/CheckboxCom/CustomCheckbox.vue';

export default {
  name: 'VUE3Test',
  components: { CustomInput, CustomCheckboxGroup, CustomCheckbox },
  setup() {
    const checkList = ref(['选中且禁用', '复选框 A']);
    const modelValue = ref('李泽');
    const fooValue = ref('aaaaa');
    // const checked = ref([]);
    const checked = ref(false);
    const aloneCheckboxC = ref([
      {
        value: 'c_0003',
        label: '复选框 C',
        disabled: false,
      },
    ]);
    const resData = [
      {
        value: 'a_0001',
        label: '复选框 A',
        disabled: false,
      },
      {
        value: 'b_0002',
        label: '复选框 B',
        disabled: true,
      },
      {
        value: 'c_0003',
        label: '复选框 C',
        disabled: false,
      },
    ];
    const handleChange = (event) => {
      console.log(event);
      console.log(checked);
    };
    const changeCheckboxGroup = (data) => {
      console.log(data);
    };
    return {
      checkList,
      modelValue,
      fooValue,
      checked,
      handleChange,
      aloneCheckboxC,
      resData,
      changeCheckboxGroup,
    };
  },
};
</script>

<style scoped lang='less'>
</style>
