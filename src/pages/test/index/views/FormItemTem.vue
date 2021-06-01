<!--
  @Author: lize
  @Date: 2021/5/28
  @Description : 单个组件拖动
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/28
 -->
<template>
  <div class='FormItemTem' ref = "FormItemTem">{{item.name}}</div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import Sortable from 'sortablejs';

export default {
  name: 'FormItemTem',
  props: {
    item: Object,
  },
  setup(props, ctx): any {
    const FormItemTem = ref(null);
    onMounted(() => {
      const FormItemTemSort = new Sortable(FormItemTem.value, {
        group: {
          name: 'shared',
        },
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        // removeCloneOnHide: false,
        fallbackOnBody: true,
        animation: 150,
        onAdd(evn) {
          console.log(evn, 'evnevnevnevnevnevnevnevnevnevnevnevn');
        },
        onUpdate(env) {
          // console.log(env, 'onUpdateonUpdateonUpdateonUpdateonUpdate');
        },
        onChange(env) {
          ctx.emit('moveChange', env);
          console.log(env, 'onChangeonChangeonChangeonChangeonChange');
        },
      });
    });
    return {
      FormItemTem,
    };
  },
};
</script>

<style lang='less' scoped>
</style>
