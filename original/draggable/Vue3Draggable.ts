/*
  @Author: lize
  @Date: 2021/5/29
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/29
*/
import {
  h, nextTick, onBeforeUnmount, onMounted, reactive, ref,
} from 'vue';
import Sortable from 'sortablejs';
import {
  defaultGroup,
  componentProps,
  eventEmitsOptions,
  eventsListenerOptions,
  createEmits,
  randCode,
  getOldNodeIndexAndData,
  removeNode,
} from './useDraggable';

const draggableComponent = {
  name: 'Draggable',
  inheritAttrs: false,
  props: componentProps,
  emits: createEmits(),
  render() {
    const {
      $slots, getTag, $attrs, prefix,
    } = this;
    return h(getTag(), { ...$attrs, id: `${prefix}-${getTag()}-wrap` }, $slots.default());
  },
  setup(props: any, ctx) {
    const ResultList = reactive(props.list);
    const SortableTarget = ref();
    const prefix = randCode();
    const getTag = () => {
      if (!props.tag) {
        console.log(ctx.slots.default());
      }
      return props.tag || 'div';
    };

    const eventObj = reactive({
      onDragStart(evt) {
        const { data } = getOldNodeIndexAndData(evt, ResultList);
        evt.item._underlying_vm_ = props.clone(data); // eslint-disable-line
        ctx.emit('dragStart', evt);
      },
      onDragAdd(evt) {
        const data = evt.item._underlying_vm_; // eslint-disable-line
        console.warn('Data list not parsed, please pass in data correctly！');
        if (!data) return;
        // eslint-disable-next-line no-use-before-define
        removeNode(evt.item);
        if (!evt.originalEvent.cancelable) return;
        ctx.emit('dragAdd', { data, newIndex: evt.newIndex, oldIndex: evt.oldIndex });
      },
      async onDragUpdate(evt) {
        const oldData = ResultList[evt.oldIndex]; // eslint-disable-line
        ResultList.splice(evt.oldIndex, 1);
        await nextTick();
        ResultList.splice(evt.newIndex, 0, oldData);
        ctx.emit('dragUpdate', evt);
      },
    });
    onBeforeUnmount(() => {
      if (SortableTarget.value) SortableTarget.value.destroy();
    });
    onMounted(async () => {
      await nextTick();
      await setTimeout(async () => {
        const targetNode = document.querySelector(`#${prefix}-${getTag()}-wrap`);
        const options = { ...props, ...eventEmitsOptions(ctx), ...eventsListenerOptions(eventObj) };
        options.group = { ...defaultGroup, ...options.group };
        SortableTarget.value = await new Sortable(targetNode, options);
      }, 500);
    });
    return {
      getTag,
      prefix,
      ...eventObj,
    };
  },
};
export default draggableComponent;
