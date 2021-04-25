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
  <div class="custom-checkbox-wrap">
    <label>
      <span>
         {{model}}----
      <input
        v-model = "model"
        :value="itemData"
        type="checkbox" />
      </span>
      <span v-if="$slots.default || label" class="el-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
    </label>
    +++++{{ddddd}}
    <label>
      <input
        v-model = "ddddd"
        :value = "yyyyy"
        type="checkbox" />
    </label>
  </div>
</template>

<script lang='ts'>
import { computed, ref } from 'vue';
import { useCheckbox } from './userCheckbox';

export default {
  name: 'CustomCheckbox',
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => undefined,
    },
    itemData: Object,
    label: {
      type: [Boolean, Number, String, Object],
    },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: undefined,
    },
    trueLabel: {
      type: [String, Number],
      default: undefined,
    },
    falseLabel: {
      type: [String, Number],
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    controls: {
      type: String,
      default: undefined,
    },
    border: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props) {
    const qwert: any = ref([{ id: 1, name: 2 }]);
    const yyyyy: any = ref({ id: 2, name: 3 });
    const ddddd = computed({
      get() {
        return qwert.value;
      },
      set(val) {
        console.log(val);
        qwert.value = val; // eslint-disable-line
      },
    });

    return {
      yyyyy, ddddd, ...useCheckbox(props),
    };
  },
};
</script>

<style scoped lang=''>

</style>
