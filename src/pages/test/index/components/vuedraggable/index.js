/* eslint-disable */
import Sortable from 'sortablejs';
import {
  computed,
  onMounted,
  reactive,
  toRefs,
  watch,
  defineComponent,
  onBeforeUnmount,
  nextTick,
  h, render,
} from 'vue';
import {
  insertNodeAt, camelize, console, removeNode,
} from './util/helper';

function buildAttribute(object, propName, value) {
  if (value === undefined) {
    return object;
  }
  object = object || {}; // eslint-disable-line
  object[propName] = value; // eslint-disable-line
  return object;
}

function computeVmIndex(vnodes, element) {
  return vnodes.map((elt) => elt.elm).indexOf(element);
}

function computeIndexes(slots, children, isTransition, footerOffset) {
  if (!slots) {
    return [];
  }

  const elmFromNodes = slots.map((elt) => elt.elm);
  const footerIndex = children.length - footerOffset;
  const rawIndexes = [...children].map((elt, idx) => // eslint-disable-line
    idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt) // eslint-disable-line
  ); // eslint-disable-line
  return isTransition ? rawIndexes.filter((ind) => ind !== -1) : rawIndexes;
}

function emit(evtName, evtData) {
  anextTick(() => this.$emit(evtName.toLowerCase(), evtData));
}

function delegateAndEmit(evtName) {
  return (evtData) => {
    if (this.realList !== null) {
      this['onDrag' + evtName](evtData); // eslint-disable-line
    }
    emit.call(this, evtName, evtData);
  };
}

function isTransitionName(name) {
  return ['transition-group', 'TransitionGroup'].includes(name);
}

function isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }
  const [{ componentOptions }] = slots;
  if (!componentOptions) {
    return false;
  }
  return isTransitionName(componentOptions.tag);
}

function getSlot(slot, scopedSlot, key) {
  return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
}

function computeChildrenAndOffsets(children, slot, scopedSlot) {
  let headerOffset = 0;
  let footerOffset = 0;
  const header = getSlot(slot, scopedSlot, 'header');
  if (header) {
    headerOffset = header.length;
    children = children ? [...header, ...children] : [...header]; // eslint-disable-line
  }
  const footer = getSlot(slot, scopedSlot, 'footer');
  if (footer) {
    footerOffset = footer.length;
    children = children ? [...children, ...footer] : [...footer]; // eslint-disable-line
  }
  return { children, headerOffset, footerOffset };
}

function getComponentAttributes($attrs, componentData) {
  let attributes = null;
  const update = (name, value) => {
    attributes = buildAttribute(attributes, name, value);
  };
  const attrs = Object.keys($attrs)
    .filter((key) => key === 'id' || key.startsWith('data-'))
    .reduce((res, key) => {
      res[key] = $attrs[key];  // eslint-disable-line
      return res;
    }, {});
  update('attrs', attrs);

  if (!componentData) {
    return attributes;
  }
  const { on, props, attrs: componentDataAttrs } = componentData;
  update('on', on);
  update('props', props);
  Object.assign(attributes.attrs, componentDataAttrs);
  return attributes;
}

const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
const eventsToEmit = ['Choose', 'Unchoose', 'Sort', 'Filter', 'Clone'];
const readonlyProperties = ['Move', ...eventsListened, ...eventsToEmit].map(
  evt => 'on' + evt // eslint-disable-line
);
var draggingElement = null; // eslint-disable-line

const props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null,
  },
  value: {
    type: Array,
    required: false,
    default: null,
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false,
  },
  clone: {
    type: Function,
    default: (original) => {
      return original;
    },
  },
  element: {
    type: String,
    default: 'div',
  },
  tag: {
    type: String,
    default: null,
  },
  move: {
    type: Function,
    default: null,
  },
  componentData: {
    type: Object,
    required: false,
    default: null,
  },
};

const draggableComponent = defineComponent({
  name: 'draggable',
  inheritAttrs: false,
  props,
  setup(props, ctx){
    if (props.list !== null && props.value !== null) {
      console.error(
        'Value and list props are mutually exclusive! Please set one or another.',
      );
    }
    if (props.element !== 'div') {
      console.warn(
        'Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props',
      );
    }
    if (props.options !== undefined) {
      console.warn(
        'Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props',
      );
    }
    const data = reactive({
      transitionMode: false,
      noneFunctionalComponentMode: false,
    });
    const getIsFunctional = () => {
      const { fnOptions } = this._vnode; // eslint-disable-line
      return fnOptions && fnOptions.functional;
    };
    const getTag = () => props.tag || props;
    const updateOptions = (newOptionValue) => {
      for (var property in newOptionValue) {
        const value = camelize(property); // eslint-disable-line
        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]); // eslint-disable-line
        }
      }
    };

    const getChildrenNodes = () => {
      if (this.noneFunctionalComponentMode) {
        return this.$children[0].$slots.default;
      }
      const rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    };

    const computeIndexes = async () => {
      await nextTick(() =>{
        this.visibleIndexes = computeIndexes(
          getChildrenNodes(),
          this.rootContainer.children,
          this.transitionMode,
          this.footerOffset
        );
      });
      // this.$nextTick(() => {
      //
      // });
    };

    const getUnderlyingVm = (htmlElt) => {
      const index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
      if (index === -1) {
        //Edge case during move callback: related element might be
        //an element different from collection
        return null;
      }
      const element = this.realList[index];
      return { index, element };
    };

    const getUnderlyingPotencialDraggableComponent = ({ __vue__: vue }) => {
      if (
        !vue ||
        !vue.$options ||
        !isTransitionName(vue.$options._componentTag)
      ) {
        if (
          !('realList' in vue) &&
          vue.$children.length === 1 &&
          'realList' in vue.$children[0]
        )
          return vue.$children[0];

        return vue;
      }
      return vue.$parent;
    };

    const emitChanges = async (evt) => {
      await nextTick(() => {
        ctx.emit('change', evt);
      });
    };

    const alterList = (onList) => {
      if (this.list) {
        onList(this.list);
        return;
      }
      const newList = [...this.value];
      onList(newList);
      ctx.emit('input', newList);
    };

    const spliceList = () => {
      const spliceList = list => list.splice(...arguments);
      this.alterList(spliceList);
    };

    const updatePosition = (oldIndex, newIndex) => {
      const updatePosition = list =>
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      this.alterList(updatePosition);
    };

    const getRelatedContextFromMoveEvent = ({ to, related }) => {
      const component = getUnderlyingPotencialDraggableComponent(to);
      if (!component) {
        return { component };
      }
      const list = component.realList;
      const context = { list, component };
      if (to !== related && list && component.getUnderlyingVm) {
        const destination = component.getUnderlyingVm(related);
        if (destination) {
          return Object.assign(destination, context);
        }
      }
      return context;
    };

    const getVmIndex = (domIndex) => {
      const indexes = this.visibleIndexes;
      console.log(indexes, 'indexesindexesindexesindexesindexes');
      const numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    };

    const getComponent = () => {
      return this.$slots.default[0].componentInstance;
    };

    const resetTransitionData = (index) => {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }
      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      const transitionContainer = getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    };

    const onDragStart = (evt) => {
      this.context = getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    };

    const onDragAdd = (evt) => {
      const element = evt.item._underlying_vm_;
      if (element === undefined) {
        return;
      }
      removeNode(evt.item);
      const newIndex = getVmIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      const added = { element, newIndex };
      emitChanges({ added });
    };

    const onDragRemove = (evt) => {
      insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
      if (evt.pullMode === 'clone') {
        removeNode(evt.clone);
        return;
      }
      const oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      const removed = { element: this.context.element, oldIndex };
      resetTransitionData(oldIndex);
      this.emitChanges({ removed });
    };

    const onDragUpdate = (evt) => {
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      const oldIndex = this.context.index;
      const newIndex = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      const moved = { element: this.context.element, oldIndex, newIndex };
      this.emitChanges({ moved });
    };

    const updateProperty = (evt, propertyName) => {
      evt.hasOwnProperty(propertyName) &&
      (evt[propertyName] += this.headerOffset);
    };

    const computeFutureIndex = (relatedContext, evt) => {
      if (!relatedContext.element) {
        return 0;
      }
      const domChildren = [...evt.to.children].filter(
        el => el.style['display'] !== 'none'
      );
      const currentDOMIndex = domChildren.indexOf(evt.related);
      const currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      const draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter
        ? currentIndex
        : currentIndex + 1;
    };

    const onDragMove = (evt, originalEvent) => {
      const onMove = this.move;
      if (!onMove || !this.realList) {
        return true;
      }

      const relatedContext = getRelatedContextFromMoveEvent(evt);
      const draggedContext = this.context;
      const futureIndex = computeFutureIndex(relatedContext, evt);
      Object.assign(draggedContext, { futureIndex });
      const sendEvt = Object.assign({}, evt, {
        relatedContext,
        draggedContext
      });
      return onMove(sendEvt, originalEvent);
    };

    const onDragEnd = () => {
      this.computeIndexes();
      draggingElement = null;
    };

    const rootContainer = computed({
      get() {
        return data.transitionMode ? this.$el.children[0] : this.$el;
      },
    });
    const realList = computed({
      get() {
        return props.list ? props.list : props.value;
      },
    });
    watch(
      () => props.options,
      (newValue) => {
        console.log(newValue);
      },
      { deep: true },
    );
    watch(
      () => ctx.$attrs,
      (newValue) => {
        updateOptions(newValue);
      },
      { deep: true },
    );
    watch(
      () => realList,
      (newValue) => {
        computeIndexes();
      },
    );
    onBeforeUnmount(() => {
      if (this._sortable !== undefined) this._sortable.destroy();
    });
    onMounted(() => {
      data.noneFunctionalComponentMode = false;
        // getTag().toLowerCase() !== this.$el.nodeName.toLowerCase()&&
        // !this.getIsFunctional();
      if (data.noneFunctionalComponentMode && data.transitionMode) {
        throw new Error(
          `Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ${this.getTag()}`
        );
      }
      const optionsAdded = {};
      eventsListened.forEach(elt => {
        optionsAdded['on' + elt] = delegateAndEmit.call(this, elt);
      });

      eventsToEmit.forEach(elt => {
        optionsAdded['on' + elt] = emit.bind(this, elt);
      });

      const attributes = Object.keys(ctx.attrs).reduce((res, key) => {
        res[camelize(key)] = ctx.attrs[key];
        return res;
      }, {});

      const options = Object.assign({}, props.options, attributes, optionsAdded, {
        onMove: (evt, originalEvent) => {
          return onDragMove(evt, originalEvent);
        }
      });
      !('draggable' in options) && (options.draggable = '>*');
      this._sortable = new Sortable(rootContainer, options);
      this.computeIndexes();
    });
    return {
      ...toRefs(data),
      rootContainer,
      getIsFunctional,
      getTag,
    };
  },
  render() {
    const slots = this.$slots.default;
    this.transitionMode = isTransition(slots);
    const { children, headerOffset, footerOffset } = computeChildrenAndOffsets(
      slots,
      this.$slots,
      this.$slots,
    );
    this.headerOffset = headerOffset;
    this.footerOffset = footerOffset;
    const attributes = getComponentAttributes(this.$attrs, this.componentData);
    return h(this.getTag(), attributes, children);
  }
  // data() {
  //   return {
  //     transitionMode: false,
  //     noneFunctionalComponentMode: false
  //   };
  // },

  // render(h) {
  //   const slots = this.$slots.default;
  //   this.transitionMode = isTransition(slots);
  //   const { children, headerOffset, footerOffset } = computeChildrenAndOffsets(
  //     slots,
  //     this.$slots,
  //     this.$scopedSlots
  //   );
  //   this.headerOffset = headerOffset;
  //   this.footerOffset = footerOffset;
  //   const attributes = getComponentAttributes(this.$attrs, this.componentData);
  //   return h(this.getTag(), attributes, children);
  // },

  // created() {
  //   if (this.list !== null && this.value !== null) {
  //     console.error(
  //       'Value and list props are mutually exclusive! Please set one or another.'
  //     );
  //   }
  //
  //   if (this.element !== 'div') {
  //     console.warn(
  //       'Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props'
  //     );
  //   }
  //
  //   if (this.options !== undefined) {
  //     console.warn(
  //       'Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props'
  //     );
  //   }
  // },

  // mounted() {
  //   this.noneFunctionalComponentMode =
  //     this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() &&
  //     !this.getIsFunctional();
  //   if (this.noneFunctionalComponentMode && this.transitionMode) {
  //     throw new Error(
  //       `Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ${this.getTag()}`
  //     );
  //   }
  //   const optionsAdded = {};
  //   eventsListened.forEach(elt => {
  //     optionsAdded['on' + elt] = delegateAndEmit.call(this, elt);
  //   });
  //
  //   eventsToEmit.forEach(elt => {
  //     optionsAdded['on' + elt] = emit.bind(this, elt);
  //   });
  //
  //   const attributes = Object.keys(this.$attrs).reduce((res, key) => {
  //     res[camelize(key)] = this.$attrs[key];
  //     return res;
  //   }, {});
  //
  //   const options = Object.assign({}, this.options, attributes, optionsAdded, {
  //     onMove: (evt, originalEvent) => {
  //       return this.onDragMove(evt, originalEvent);
  //     }
  //   });
  //   !('draggable' in options) && (options.draggable = '>*');
  //   this._sortable = new Sortable(this.rootContainer, options);
  //   this.computeIndexes();
  // },

  // beforeDestroy() {
  //   if (this._sortable !== undefined) this._sortable.destroy();
  // },

  // computed: {
  //   rootContainer() {
  //     return this.transitionMode ? this.$el.children[0] : this.$el;
  //   },
  //
  //   realList() {
  //     return this.list ? this.list : this.value;
  //   }
  // },

  // watch: {
    // options: {
    //   handler(newOptionValue) {
    //     this.updateOptions(newOptionValue);
    //   },
    //   deep: true
    // },

    // $attrs: {
    //   handler(newOptionValue) {
    //     this.updateOptions(newOptionValue);
    //   },
    //   deep: true
    // },

    // realList() {
    //   this.computeIndexes();
    // }
  // },

  // methods: {
    // getIsFunctional() {
    //   const { fnOptions } = this._vnode;
    //   return fnOptions && fnOptions.functional;
    // },
    //
    // getTag() {
    //   return this.tag || this.element;
    // },

    // updateOptions(newOptionValue) {
    //   for (var property in newOptionValue) {
    //     const value = camelize(property);
    //     if (readonlyProperties.indexOf(value) === -1) {
    //       this._sortable.option(value, newOptionValue[property]);
    //     }
    //   }
    // },
    //
    // getChildrenNodes() {
    //   if (this.noneFunctionalComponentMode) {
    //     return this.$children[0].$slots.default;
    //   }
    //   const rawNodes = this.$slots.default;
    //   return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    // },
    //
    // computeIndexes() {
    //   this.$nextTick(() => {
    //     this.visibleIndexes = computeIndexes(
    //       this.getChildrenNodes(),
    //       this.rootContainer.children,
    //       this.transitionMode,
    //       this.footerOffset
    //     );
    //   });
    // },
    //
    // getUnderlyingVm(htmlElt) {
    //   const index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
    //   if (index === -1) {
    //     //Edge case during move callback: related element might be
    //     //an element different from collection
    //     return null;
    //   }
    //   const element = this.realList[index];
    //   return { index, element };
    // },
    //
    // getUnderlyingPotencialDraggableComponent({ __vue__: vue }) {
    //   if (
    //     !vue ||
    //     !vue.$options ||
    //     !isTransitionName(vue.$options._componentTag)
    //   ) {
    //     if (
    //       !('realList' in vue) &&
    //       vue.$children.length === 1 &&
    //       'realList' in vue.$children[0]
    //     )
    //       return vue.$children[0];
    //
    //     return vue;
    //   }
    //   return vue.$parent;
    // },
    //
    // emitChanges(evt) {
    //   this.$nextTick(() => {
    //     this.$emit('change', evt);
    //   });
    // },
    //
    // alterList(onList) {
    //   if (this.list) {
    //     onList(this.list);
    //     return;
    //   }
    //   const newList = [...this.value];
    //   onList(newList);
    //   this.$emit('input', newList);
    // },
    //
    // spliceList() {
    //   const spliceList = list => list.splice(...arguments);
    //   this.alterList(spliceList);
    // },
    //
    // updatePosition(oldIndex, newIndex) {
    //   const updatePosition = list =>
    //     list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    //   this.alterList(updatePosition);
    // },
    //
    // getRelatedContextFromMoveEvent({ to, related }) {
    //   const component = this.getUnderlyingPotencialDraggableComponent(to);
    //   if (!component) {
    //     return { component };
    //   }
    //   const list = component.realList;
    //   const context = { list, component };
    //   if (to !== related && list && component.getUnderlyingVm) {
    //     const destination = component.getUnderlyingVm(related);
    //     if (destination) {
    //       return Object.assign(destination, context);
    //     }
    //   }
    //   return context;
    // },
    //
    // getVmIndex(domIndex) {
    //   const indexes = this.visibleIndexes;
    //   const numberIndexes = indexes.length;
    //   return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    // },
    //
    // getComponent() {
    //   return this.$slots.default[0].componentInstance;
    // },
    //
    // resetTransitionData(index) {
    //   if (!this.noTransitionOnDrag || !this.transitionMode) {
    //     return;
    //   }
    //   var nodes = this.getChildrenNodes();
    //   nodes[index].data = null;
    //   const transitionContainer = this.getComponent();
    //   transitionContainer.children = [];
    //   transitionContainer.kept = undefined;
    // },
    //
    // onDragStart(evt) {
    //   this.context = this.getUnderlyingVm(evt.item);
    //   evt.item._underlying_vm_ = this.clone(this.context.element);
    //   draggingElement = evt.item;
    // },
    //
    // onDragAdd(evt) {
    //   const element = evt.item._underlying_vm_;
    //   if (element === undefined) {
    //     return;
    //   }
    //   removeNode(evt.item);
    //   const newIndex = this.getVmIndex(evt.newIndex);
    //   this.spliceList(newIndex, 0, element);
    //   this.computeIndexes();
    //   const added = { element, newIndex };
    //   this.emitChanges({ added });
    // },
    //
    // onDragRemove(evt) {
    //   insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
    //   if (evt.pullMode === 'clone') {
    //     removeNode(evt.clone);
    //     return;
    //   }
    //   const oldIndex = this.context.index;
    //   this.spliceList(oldIndex, 1);
    //   const removed = { element: this.context.element, oldIndex };
    //   this.resetTransitionData(oldIndex);
    //   this.emitChanges({ removed });
    // },
    //
    // onDragUpdate(evt) {
    //   removeNode(evt.item);
    //   insertNodeAt(evt.from, evt.item, evt.oldIndex);
    //   const oldIndex = this.context.index;
    //   const newIndex = this.getVmIndex(evt.newIndex);
    //   this.updatePosition(oldIndex, newIndex);
    //   const moved = { element: this.context.element, oldIndex, newIndex };
    //   this.emitChanges({ moved });
    // },
    //
    // updateProperty(evt, propertyName) {
    //   evt.hasOwnProperty(propertyName) &&
    //   (evt[propertyName] += this.headerOffset);
    // },
    //
    // computeFutureIndex(relatedContext, evt) {
    //   if (!relatedContext.element) {
    //     return 0;
    //   }
    //   const domChildren = [...evt.to.children].filter(
    //     el => el.style['display'] !== 'none'
    //   );
    //   const currentDOMIndex = domChildren.indexOf(evt.related);
    //   const currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
    //   const draggedInList = domChildren.indexOf(draggingElement) !== -1;
    //   return draggedInList || !evt.willInsertAfter
    //     ? currentIndex
    //     : currentIndex + 1;
    // },
    //
    // onDragMove(evt, originalEvent) {
    //   const onMove = this.move;
    //   if (!onMove || !this.realList) {
    //     return true;
    //   }
    //
    //   const relatedContext = this.getRelatedContextFromMoveEvent(evt);
    //   const draggedContext = this.context;
    //   const futureIndex = this.computeFutureIndex(relatedContext, evt);
    //   Object.assign(draggedContext, { futureIndex });
    //   const sendEvt = Object.assign({}, evt, {
    //     relatedContext,
    //     draggedContext
    //   });
    //   return onMove(sendEvt, originalEvent);
    // },
    //
    // onDragEnd() {
    //   this.computeIndexes();
    //   draggingElement = null;
    // }
  // }
});

if (typeof window !== 'undefined' && 'Vue' in window) {
  window.Vue.component('draggable', draggableComponent);
}

export default draggableComponent;
