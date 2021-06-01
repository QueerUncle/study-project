<!--
  @Author: lize
  @Date: 2021/3/17
  @Description : 树组件
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/17
 -->
<template>
  <div class="tree-com-wrap">
      <div
        v-for = "item in treeData"
        :key = "item[rowKey]"
        class = "item-wrap">
        <div
          draggable="true"
          class = "item-info-wrap"
          @dragstart="dragstart($event, item)"
          @dragenter="handleDragenter"
          @drag="handledrag($event)"
          @click.stop = "handleCLick(item)">
          {{item[valueName]}}
        </div>
        <div class = "children-wrap" v-if="item[childrenKey] && item[childrenKey].length">
          <TreeCom
            @item-drag = "handleItemDrag"
            @item-click = "handleItemClick"
            :tree-data="item[childrenKey]"/>
        </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { reactive } from 'vue';

export default {
  name: 'TreeCom',
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: () => 'id',
    },
    valueName: {
      type: String,
      default: () => 'label',
    },
    childrenKey: {
      type: String,
      default: () => 'children',
    },
  },
  emits: ['item-click', 'item-drag'],
  setup(props, ctx) {
    const list1 = reactive([
      { name: 'John', id: 1 },
      { name: 'oao', id: 2 },
      { name: 'Jean', id: 3 },
      { name: 'Gerard', id: 4 },
    ]);
    const list2 = reactive([
      { name: 'Juan', id: 5 },
      { name: 'Edgard', id: 6 },
      { name: 'Johnson', id: 7 },
    ]);
    // 拖拽的元素
    let targetData: any = reactive(null);
    // 节点发生点击
    const handleCLick = (item) => {
      ctx.emit('item-click', item);
    };
    // 节点发生点击子组件回调
    const handleItemClick = (item) => {
      handleCLick(item);
    };
    // 拖拽开始的时候
    const dragstart = (event, item) => {
      targetData = item;
      ctx.emit('item-drag', event, item);
    };
    // 拖拽开始的时候 子组件出发
    const handleItemDrag = (event, item) => {
      dragstart(event, item);
    };
    const handledrag = (event) => {
      // console.log(event, 'handledraghandledraghandledraghandledraghandledrag');
    };
    const handleDragenter = (event) => {
      console.log(event, 'handleDragenterhandleDragenterhandleDragenterhandleDragenter');
    };
    // 获取该组件内保存的拖着的节点数据，返回正在拖拽的元素
    const getTargetData = () => targetData;
    const log = (evt) => {
      console.log(evt);
    };
    return {
      log,
      handleCLick,
      dragstart,
      handleItemClick,
      handleItemDrag,
      getTargetData,
      list1,
      list2,
      handledrag,
      handleDragenter,
    };
  },
};
</script>

<style scoped lang='less'>
.tree-com-wrap{
  padding: 10px;
  .item-wrap{
    .item-info-wrap{
      cursor: pointer;
      &:hover{
        color: #409EFF;
      }
    }
  }
}
</style>
