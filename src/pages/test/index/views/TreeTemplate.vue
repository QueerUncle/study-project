<!--
  @Author: lize
  @Date: 2021/3/17
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/17
 -->
<template>
  <div class="Tree-tem-wrap">
    <div class = "left-wrap">
      <TreeCom
        ref = "customTree"
        :tree-data="treeData"
        @item-click = "handleItemClick" />
    </div>
    <div
      @dragover="(event) => event.preventDefault()"
      @drop="drop"
      class = "right-wrap">
      <RightTem
        :getTargetData = "getTargetData"
        :draggableData = "targetData"/>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, ref } from 'vue';
import TreeCom from '../components/TreeCom.vue';
import RightTem from '../components/RightTem.vue';

export default {
  name: 'TreeTem',
  components: { TreeCom, RightTem },
  setup() {
    // 树的数据
    const treeData = reactive([
      {
        id: '1',
        label: '1',
        children: [
          {
            id: '1-1',
            label: '1-1',
            children: [
              {
                id: '1-1-1',
                label: '1-1-1',
              },
            ],
          },
          {
            id: '1-2',
            label: '1-2',
            children: [
              {
                id: '1-2-1',
                label: '1-2-1',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        label: '2',
        children: [
          {
            id: '2-1',
            label: '2-1',
            children: [
              {
                id: '2-1-2',
                label: '2-1-2',
                children: [
                  {
                    id: '2-1-3',
                    label: '2-1-3',
                  },
                ],
              },
            ],
          },
          {
            id: '2-2',
            label: '2-2',
            children: [
              {
                id: '2-2-1',
                label: '2-2-1',
              },
            ],
          },
        ],
      },
      {
        id: '3',
        label: '3',
        children: [
          {
            id: '3-1',
            label: '3-1',
          },
        ],
      },
      {
        id: '4',
        label: '4',
      },
    ]);
    let targetData: any = reactive(null);
    // tree节点
    const customTree = ref(null);
    // tree节点发生点击时
    const handleItemClick = (item) => {
      console.log(item);
    };
    // 获取子组件的拖动的元素
    const getTargetData = () => customTree.value.getTargetData();
    // 拖拽结束时
    const drop = () => {
      targetData = getTargetData();
      // console.log(targetData);
    };
    return {
      treeData,
      targetData,
      drop,
      customTree,
      getTargetData,
      handleItemClick,
    };
  },
};
</script>

<style scoped lang='less'>
.Tree-tem-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  .left-wrap{
    width: 240px;
    height: 100%;
  }
  .right-wrap{
    flex: 2;
    height: 100%;
  }
}
</style>
