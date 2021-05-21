/*
  @Author: lize
  @Date: 2021/1/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/1/27
 */
import { AxiosInstance } from 'axios';

declare module 'Vue/types/vue' {
  interface Vue {
    $Http: AxiosInstance;
    logString: Function;
    window: any;
    Window: aany;
  }
  interface Window {
    logString: Function;
  }
}
