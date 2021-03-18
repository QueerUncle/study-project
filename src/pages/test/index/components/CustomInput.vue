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
  <div class="custom-input-wrap">
    <input type="text" @input = "valueChange" :value = "modelValueaa">
    <input type="text" @input = "fooChange" :value = "fooValue">
  </div>
</template>

<script lang='ts'>

import { ref, watch } from 'vue';

export default {
  name: 'CustomInput',
  props: {
    foo: String,
    modelValue: String,
  },
  emits: ['update:modelValue', 'update:foo'],
  setup(props, ctx) {
    const modelValueaa = ref('');
    const fooValue = ref('');
    watch(
      () => props.foo,
      (newValue: any) => {
        fooValue.value = newValue;
      },
      { immediate: true, deep: true },
    );
    watch(
      () => props.modelValue,
      (newValue: any) => {
        modelValueaa.value = newValue;
      },
      {
        immediate: true,
        deep: true,
      },
    );
    const valueChange = (event) => {
      ctx.emit('update:modelValue', event.target.value);
    };
    const fooChange = (event) => {
      ctx.emit('update:foo', event.target.value);
    };
    const objARY = {
      list: [
        {
          id: 1,
          name: 2,
        },
        {
          id: 3,
          name: 4,
        },
      ],
    };
    const dddd = new Proxy(objARY.list, {
      set(target, prop, value, receiver) {
        // console.log(target, prop, value, receiver);
        return Reflect.set(target, prop, value);
      },
      deleteProperty(target, prop) {
        // console.log(target, prop, '222222');
        return Reflect.deleteProperty(target, prop);
      },
    });
    // dddd[2] = { id: 7, name: 999 };
    dddd.push({ id: 7, name: 999 });
    console.log(dddd);
    dddd.splice(0, 1);
    console.log(dddd);
    const oldObj = {
      a: 1,
      b: 2,
    };
    const newDataAry = [
      {
        key: 'q',
        name: 'a',
      },
      {
        key: 'a',
        name: 'a',
      },
    ];

    const newAry = [];
    const copyObj = [];
    for (let i = 0; i < newDataAry.length; i += 1) {
      copyObj.push(newDataAry[i].key);
    }
    Object.keys(oldObj).forEach((item) => {
      if (!copyObj.includes(item)) {
        newAry.push(oldObj[item]);
      }
    });
    console.log(newAry);

    return {
      modelValueaa,
      fooValue,
      valueChange,
      fooChange,
    };
  },
};
</script>

<style scoped lang=''>

</style>
