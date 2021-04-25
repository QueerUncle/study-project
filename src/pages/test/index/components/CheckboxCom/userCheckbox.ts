/*
  @Author: lize
  @Date: 2021/3/24
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/24
 */
import {
  ref,
  computed,
  inject,
} from 'vue';

export const useCheckboxGroup = () => {
  const checkboxGroup = inject<any>('CheckboxGroup', {});
  const isGroup = computed(() => checkboxGroup && checkboxGroup?.name === 'ElCheckboxGroup');
  return {
    isGroup,
    checkboxGroup,
  };
};

const useModel = (props: any) => {
  let selfModel = false; // eslint-disable-line
  // const { emit } = getCurrentInstance();
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitExceeded = ref(false);
  const store = computed(() => checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue); // eslint-disable-line
  const model = computed({
    get() {
      return isGroup.value
        ? store.value
        : props.modelValue ?? selfModel;
    },

    set(val: any) {
      console.log(val);
      // if (isGroup.value && Array.isArray(val)) {
      //   isLimitExceeded.value = false;
      //
      //   if (checkboxGroup.min !== undefined && val.length < checkboxGroup.min.value) {
      //     isLimitExceeded.value = true;
      //   }
      //   if (checkboxGroup.max !== undefined && val.length > checkboxGroup.max.value) {
      //     isLimitExceeded.value = true;
      //   }
      checkboxGroup?.changeEvent?.(val); // eslint-disable-line
      // isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val);
      // } else {
      //   emit('update:modelValue', val);
      //   selfModel = val as boolean; // eslint-disable-line
      // }
    },
  });

  return {
    checkboxGroup,
    model,
    isLimitExceeded,
  };
};

// const useCheckboxStatus = (props: any, { model }: any) => {
//   // const { isGroup, checkboxGroup } = useCheckboxGroup();
//   const focus = ref(false);
//   const isChecked = computed(() => { // eslint-disable-line
//     const value = model.value; // eslint-disable-line
//     if (Array.isArray(value)) {
//       return value.includes(props.label);
//     } else if (value !== null && value !== undefined) { // eslint-disable-line
//       return value === props.trueLabel;
//     }
//   });
//
//   return {
//     isChecked,
//     focus,
//   };
// };
//
// const useDisabled = (props: any, { model, isChecked }: any) => {
//   const { isGroup, checkboxGroup } = useCheckboxGroup();
//   const isLimitDisabled = computed(() => {
//     const max = checkboxGroup.max?.value;
//     const min = checkboxGroup.min?.value;
//     return !!(max || min) && (model.value.length >= max && !isChecked.value) ||
// eslint-disable-line
//       (model.value.length <= min && isChecked.value);
//   });
//   const isDisabled = computed(() => { // eslint-disable-line
//     return isGroup.value
//       ? checkboxGroup.disabled?.value || isLimitDisabled.value
//       : props.disabled;
//   });
//
//   return {
//     isDisabled,
//     isLimitDisabled,
//   };
// };
//
// const setStoreValue = (props: any, { model }: any) => {
//   function addToStore() {
//     if (
//       Array.isArray(model.value) && !model.value.includes(props.label)
//     ) {
//       model.value.push(props.label);
//     } else {
//       model.value = props.trueLabel || true; // eslint-disable-line
//     }
//   }
//   props.checked && addToStore(); // eslint-disable-line
// };
//
// // 处理单个
// const useEvent = (props: any, { isLimitExceeded }: any) => {
//   const { emit } = getCurrentInstance();
//   function handleChange(e: InputEvent) {
//     if (isLimitExceeded.value) return;
//     const target = e.target as HTMLInputElement;
//     const value = target.checked
//       ? props.trueLabel ?? true
//       : props.falseLabel ?? false;
//     emit('changeasdasdasdasdasdasdasd', value, e);
//   }
//   return {
//     handleChange,
//   };
// };
export const useCheckbox = (props: any) => {
  const { model } = useModel(props);
  // const { focus, isChecked } = useCheckboxStatus(props, { model });
  // const { isDisabled } = useDisabled(props, { model, isChecked });
  // const { handleChange } = useEvent(props, { isLimitExceeded });

  // setStoreValue(props, { model });

  return {
    // isChecked,
    // isDisabled,
    model,
    // handleChange,
    // focus,
  };
};
