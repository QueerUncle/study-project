/*
  @Author: lize
  @Date: 2021/5/10
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/10
 */
import { computed } from 'vue';
export const asd = () => 'asdasd';
interface Iattr {
  template: string;
  forntId: string;
}
interface Iinput {
  id: string;
  name: string;
  attr: Iattr;
}
export const useInput = (props) => { // eslint-disable-line
  const qwer = computed({
    get() {
      return props.arr;
    },
    set() {
      console.log('1111111');
    },
  });
  const modelInfo = computed({
    get(): Iinput {
      return props.modelInfo;
    },
    set() {
      console.log('fashengle set');
    },
  });
  const po = 'lize';
  return {
    qwer,
    po,
    modelInfo,
  };
};
