/*
  @Author: lize
  @Date: 2021/5/13
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/13
 */
import { getCurrentInstance } from 'vue';

export const isServer = () => typeof window === 'undefined';
export const useGlobalConfig = () => {
  const vm: any = getCurrentInstance().appContext.config.globalProperties;
  if (!vm || !Object.keys(vm).length) return null;
  return vm;
};
