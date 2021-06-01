/*
  @Author: lize
  @Date: 2021/6/1
  @Description : DraggableHooks
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/1
*/
export const eventsListened = ['Start', 'Add', 'Update'];
export const eventsEmits = ['End', 'Remove', 'Sort', 'Filter', 'Move', 'Clone', 'Change', 'Unchoose', 'Choose'];
export const componentProps = {
  tag: {
    type: String,
    default: 'div',
    require: true,
  },
  group: {
    type: Object,
    default: () => ({
      name: 'form',
      pull: 'clone',
      put: false,
    }),
  },
  ghostClass: {
    type: String,
    default: '',
  },
  sort: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: Number,
    default: 150,
  },
  list: {
    type: Array,
    default: () => ([]),
  },
  clone: {
    type: Function,
    default: (cloneData) => (cloneData),
  },
};
export const eventEmitsOptions = (ctx) => eventsEmits.reduce((res, item) => { // eslint-disable-line
  res[`on${item}`] = (evt) => ctx.emit(`drag${item}`, evt); // eslint-disable-line
  return res;
}, {});
export const eventsListenerOptions = (eventObj) => eventsListened.reduce((res, evt) => { // eslint-disable-line
  res[`on${evt}`] = eventObj[`onDrag${evt}`]; // eslint-disable-line
  return res;
}, {});
export const createEmits = () => [...eventsListened, ...eventsEmits].reduce((res, evt) => {
  res.push(`drag${evt}`);
  return res;
}, []);
export const randCode = () => {
  const result = [];
  for (let i = 0; i < 4; i += 1) {
    const ranNum = Math.ceil(Math.random() * 25);
    result.push(String.fromCharCode(65 + ranNum));
  }
  return result.join('');
};
export const findNodeIndex = (nodeAry, targetNode) => nodeAry.indexOf(targetNode);
export const getChildrenNodes = (element) => [].slice.call(element.children);
export const getOldNodeIndexAndData = (evt, ResultList) => {
  const index = findNodeIndex(getChildrenNodes(evt.from), evt.item);
  if (index === -1) return null;
  const data = ResultList[index];
  return { index, data };
};
export const removeNode = (node) => {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
};
