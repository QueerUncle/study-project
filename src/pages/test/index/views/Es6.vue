<!--
  @Author: lize
  @Date: 2021/6/15
  @Description : Es6学习
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/15
 -->
<template>
  <div class="Es6-wrap">
    {{s1.description}}
    {{obj[s1]}}
    <el-input v-model = "inputValue" @input = "handleChange(inputValue)"/>
    {{proxyMap.get('c')}}
  </div>
</template>
<script lang='ts'>
import { ref, nextTick, reactive } from 'vue';
export default {
  name: 'Es6',
  setup() {
    const inputValue = ref('');
    const handleChange = (value) => {
      const reg = /^[0-9]/g;
      inputValue.value = value.replace(reg,'').replace(/[^\w_]/g,'') // eslint-disable-line
      // console.log(reg.test(inputValue.value), 'asdreg.testvalue)', inputValue.value.length);
      const fn = (str: string) => {
        if (!str.length || !reg.test(str)) return;
        inputValue.value = str.replace(/^[0-9]/g,''); // eslint-disable-line
        nextTick(() => {
          fn(inputValue.value);
        });
      };
      nextTick(() => {
        fn(inputValue.value);
      });
    };
    const s1 = Symbol('s1');
    const s2 = Symbol('s2');
    console.log(s1);
    const obj = ref({});
    obj.value['age'] = '18'; // eslint-disable-line
    obj.value[s1] = 'Hello';
    obj.value[s2] = 'Word';
    // Symbol不可迭代，所以，for...in  for...of Object.keys() object.values() 获取不到
    console.log(Object.keys(obj.value));
    // Reflect.ownKeys 可以拿到所有的属性的key，包含 Symbol
    console.log(Reflect.ownKeys(obj.value));
    // Object.getOwnPropertySymbols() 可以获取到对象中的Symbol
    Object.getOwnPropertySymbols(obj.value).forEach((item) => {
      console.log(item);
      console.log(item.description);
      console.log(obj.value[item]);
    });
    const add = (num) => {
      let sum = num; // eslint-disable-line
      const fn=function(v){ // eslint-disable-line
        sum+=v; // eslint-disable-line
        return fn // eslint-disable-line
      };
      fn.toString = () => sum;
      return fn // eslint-disable-line
    };
    console.log(add(1)(2)(3)(4)) // eslint-disable-line
    const adds = function() { // eslint-disable-line
      let args = [].slice.call(arguments); // eslint-disable-line
      const fn = function(){ // eslint-disable-line
        args.push(...arguments); // eslint-disable-line
        return fn;
      };
      fn.toString = () => args.reduce((a, b) => a + b); // eslint-disable-line
      return fn;
    };
    // console.log(adds(1)(1,2,3)(2), 'qweqweqwe') // eslint-disable-line
    const set = new Set([1, 2, 3, 4, 5]);
    set.add(6);
    set.add(10);
    set.add(7);
    const setObj = new Set();
    setObj.add({ age: 18 });
    console.log(set, 'setsetsetset', setObj);
    const a = setObj.delete('age');
    const b = set.delete(5);
    // setObj.clear();
    console.log(setObj, 'setObjsetObjsetObj', a, b);
    console.log(Array.from(set.keys()), '    set.keys()    set.keys()');
    console.log(Array.from(set.values()), '    set.keys()    set.keys()');
    console.log(Array.from(setObj.keys()), '    set.keys()    set.keys()');
    console.log(Array.from(setObj.values()), '    set.keys()    set.keys()');
    console.log([...set], '...set...set...set...set');
    // 交集  并集 差集
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 3, 2, 5, 6]);
    // 并集
    const union = new Set([...set1, ...set2]);
    // 交集 最正确的是new Set size小的那个数组，在大的里面找
    const intersect = new Set([...set1].filter((x) => set2.has(x)));
    // （set1 相对于 set2 的）差集 最正确的是new Set size大的那个数组，在小的里面找
    const difference = new Set([...set1].filter((x) => !set2.has(x)));
    console.log(union, intersect, difference);
    const mapObj = { a: 1, b: 2 };
    const map = new Map(Object.entries(mapObj));
    map.forEach((value, key) => {
      console.log(map.get(key));
    });
    // console.log(new Set(map.values()));
    const proxyMap = reactive(new Map(Object.entries(mapObj)));
    proxyMap.forEach((value, key) => {
      console.log(proxyMap.get(key));
    });
    setTimeout(() => {
      proxyMap.set('c', 3);
    }, 1000);
    console.log(proxyMap);
    console.log(JSON.stringify([...proxyMap]));
    return {
      proxyMap,
      handleChange,
      inputValue,
      s1,
      s2,
      obj,
    };
  },
};
</script>

<style scoped lang='less'>

</style>
