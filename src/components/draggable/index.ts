import Vue3Draggable from './Vue3Draggable';
import Vue2Draggable from './Vue2Draggable';

export default {
  install(Vue, options) {
    let component: any = Vue3Draggable;
    if (options && options.componentType === 'vue2') {
      component = Vue2Draggable;
    }
    Vue.component('Draggable', component);
  },
};
