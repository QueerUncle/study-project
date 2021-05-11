<!--
  @Author: lize
  @Date: 2021/4/25
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/25
 -->
<template>
  <div class="object-define-property-wrap">

  </div>
</template>

<script lang="ts">
export default {
  name: 'ObjectDefineProperty',
  setup() { // eslint-disable-line
    const defineReactive = (data, key, value) => {
      Object.defineProperty(data, key, {
        enumerable: true, // 是否可枚举
        configurable: true, // 是否可以被改变或者删除
        get: function defineGet() {
          console.log(`get key: ${key} value: ${value}`);
          return value;
        },
        set: function defineSet(newVal) {
          console.log(`set key: ${key} value: ${newVal}`);
          value = newVal; // eslint-disable-line
        },
      });
    };
    const observe = (data) => {
      Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
      });
    };
    const arr = [1, 2, 3];
    observe(arr);
    // console.log(arr[1], 'custom'); // 直接通过下标设置可以触发get
    // arr[1] = 5; // 直接通过下标设置可以触发set
    // arr.push(10); // push 没有触发
    // console.log(arr, 'push后查看');
    arr.unshift(0);
    // // console.log(arr, 'unshift后查看');
    // console.log(arr[2], 'unshift后查看打印');
    // arr.pop();
    // arr.pop();
    // arr.pop();
    return {};
  },
};
</script>

<style scoped lang="less">

</style>
