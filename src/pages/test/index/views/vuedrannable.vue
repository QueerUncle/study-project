<!--
  @Author: lize
  @Date: 2021/5/28
  @Description : vue拖拽
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/28
 -->
<template>
  <div class = "vuedrannable-wrap">
    <div ref = "leftWrap" class = "left-wrap">
      <div
        class = "left-item-wrap"
        form = "leftWrap"
        v-for="(item, index) in leftComList"
        :key = "index">
        {{item.name}}
      </div>
    </div>
    <div class = "content-wrap">
      <ContentTem
        @moveChange = "handleMoveChange"
        ref = "ContentTemWrap"
        :elements = "contentComList"  />
    </div>
    <div class = "right-wrap"></div>
  </div>
</template>

<script lang='ts'>
import {
  onMounted, reactive, ref, nextTick,
} from 'vue';
import Sortable from 'sortablejs';
import ContentTem from './ContentTem.vue';

export default {
  name: 'vuedrannable',
  components: { ContentTem },
  setup(): any {
    const leftWrap = ref(null);
    const ContentTemWrap = ref(null);
    const leftComList = reactive([
      {
        name: '单行文班框',
        type: 'text',
        child: [],
      },
      {
        name: '多行文班框',
        type: 'textarea',
        child: [],
      },
      {
        name: '日期选择器',
        type: 'dataSelect',
        child: [],
      },
      {
        name: '下拉框',
        type: 'select',
        child: [],
      },
      {
        name: '容器',
        type: 'container',
        child: [],
      },
    ]);
    const contentComList = reactive([]);
    const moveingTargetInfo = ref(null);
    const handleMoveChange = (env) => {
      moveingTargetInfo.value = env;
    };
    onMounted(() => {
      const leftWrapSort = new Sortable(leftWrap.value, {
        group: {
          name: 'shared',
          pull: 'clone',
          put: false, // 不允许拖拽进这个列表
        },
        forceFallback: true,
        animation: 150,
        sort: false, // 设为false，禁止sort
        setData(dataTransfer, dragEl) {
          console.log(dataTransfer, '0000000000');
          dataTransfer.setData('Text', '11111111111111'); // `dataTransfer` object of HTML5 DragEvent
        },
        async onRemove(evt) {
          console.log(evt, 'evtevtevtevtevtevtevtevtevt');
          const fromClassList = [].slice.call(evt.from.classList);
          if (fromClassList.includes('left-wrap')) {
            const toElementParent = evt.to.parentElement;
            if (toElementParent.getAttribute('type') === 'container') {
              const target = contentComList[toElementParent.getAttribute('index')];
              console.log(moveingTargetInfo, 'moveingTargetInfo');
              if (target.child.length) {
                target.child.splice(moveingTargetInfo.value.newIndex, 0,
                leftComList[evt.oldIndex]);
              } else {
              target.child.push(leftComList[evt.oldIndex]);
            } else { // eslint-disable-line
              contentComList.splice(evt.newIndex, 0, leftComList[evt.oldIndex]);
            }
          }
          await nextTick();
          const toElementChildren = [].slice.call(evt.to.children);
          const formElementIndex = toElementChildren.findIndex((item) => item.getAttribute('form') === 'leftWrap');
          if (formElementIndex > -1) {
            evt.to.removeChild(evt.to.children[formElementIndex]);
          }
        },
      });
    });
    return {
      leftComList,
      contentComList,
      leftWrap,
      ContentTemWrap,
      handleMoveChange,
    };
  },
};
</script>

<style lang='less' scoped>
.vuedrannable-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  .left-wrap{
    width: 240px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid #ccc;
    align-content: end;
    .left-item-wrap{
      width: 80px;
      height: 35px;
      border: 1px solid #757575;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      cursor: pointer;
      &:hover{
        color: #409EFF;
        border: 1px solid #409EFF;
      }
    }
  }
  .content-wrap{
    flex: 1;
    height: 100%;
    .left-item-wrap{
      color: #ffffff;
      width: 100%;
      height: 30px;
      background: red;
    }
    .content-item-wrap {
      width: 100%;
      height: 35px;
      border: 1px solid #757575;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      cursor: pointer;
      background: skyblue;
      &:hover{
        color: pink;
        border: 1px solid pink;
      }
    }
    .container-item-wrap{
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid #757575;
      background: skyblue;
      .container-item-wrap-title{
        width: 100%;
      }
      .container-item-wrap-content{
        min-height: 50px;
        width: 100%;
        border: 1px dashed #757575;
      }
    }
  }
  .right-wrap{
    width: 240px;
    height: 100%;
    border-left: 1px solid #ccc;
  }
}
</style>
