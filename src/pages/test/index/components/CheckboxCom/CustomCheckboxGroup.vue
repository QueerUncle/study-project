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
  <div class="custom-checkbox-group-wrap">
    <slot></slot>
  </div>
</template>

<script lang='ts'>

import {
  computed, provide, nextTick, toRefs,
} from 'vue';

export default {
  name: 'CustomCheckboxGroup',
  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      default: () => undefined,
    },
    disabled: Boolean,
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    fill: {
      type: String,
      default: undefined,
    },
    textColor: {
      type: String,
      default: undefined,
    },
  },

  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const changeEvent = (value) => {
      ctx.emit('update:modelValue', value);
      nextTick(() => {
        ctx.emit('change', value);
      });
    };

    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      },
    });

    provide('CheckboxGroup', {
      name: 'ElCheckboxGroup',
      modelValue,
      ...toRefs(props),
      changeEvent,
    });
  },
};
</script>

<style scoped lang=''>

</style>
