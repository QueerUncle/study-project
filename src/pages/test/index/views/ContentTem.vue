<!--
  @Author: lize
  @Date: 2021/5/28
  @Description : 中间模版
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/28
 -->
<template>
  <div class = "set-area" ref = "setAreaWrap">
    <el-row  type = "flex" style="width: 100%" >
      <ul ref = "elRowWrap" style="display: flex;flex-direction: column; width: 100%">
        <el-col
          style="flex: none"
          ref = "elColWrap"
          v-for="(item, index) in elements"
          :key="item.id"
          :dataid="item.id"
          :type = "item.type"
          :span="24">
          <!--      单个组件-->
          <FormItemTem
            class = "content-item-wrap"
            :item = "item"
            v-if="item.type !== 'container'" />
                  <div
                    ref = "contentItemWrap"
                    v-if="item.type !== 'container'">
                    {{item.name}}
                  </div>
          <!--      多个组件-->
          <div v-else class = "container-item-wrap">
            <div class = "container-item-wrap-title">{{item.name}}</div>
            <div class = "container-item-wrap-content" :type = "item.type" :index = "index">
              <ContentTem :elements = "item.child" />
            </div>
          </div>
        </el-col>
      </ul>
    </el-row>
  </div>
</template>

<script lang='ts'>
import {
  onMounted, ref, nextTick, watch,
} from 'vue';
import Sortable from 'sortablejs';
import FormItemTem from './FormItemTem.vue';

export default {
  name: 'ContentTem',
  components: { FormItemTem },
  props: {
    elements: Array,
  },
  inheritAttrs: true,
  emits: ['moveChange'],
  setup(props, ctx): any {
    const setAreaWrap = ref(null);
    const elColWrap = ref(null);
    const elRowWrap = ref(null);
    // const asdasdasd324ewrwerwer = async () => {
    //   await nextTick();
    //   setTimeout(() => {
    //     // console.log(elColWrap.value, 'asdasdasdasdasdasdasdasdasdasd');
    //   }, 1000);
    // };
    watch(
      () => props.elements,
      async (newValue) => {
        await nextTick();
        console.log(newValue);
        console.log(elColWrap.value, 'asdasdasdasdasdasdasdasdasdasd');
      },
      { deep: true },
    );
    onMounted(async () => {
      await nextTick();
      console.log(setAreaWrap.value);
      console.log(elRowWrap.value);
      const setAreaWrapSort = new Sortable(setAreaWrap.value, {
        group: {
          name: 'shared',
        },
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        // removeCloneOnHide: false,
        fallbackOnBody: true,
        animation: 150,
        // onAdd(evn) {
        //   console.log(evn, 'evnevnevnevnevnevnevnevnevnevnevnevn');
        // },
        onUpdate(env) {
          // console.log(env, 'onUpdateonUpdateonUpdateonUpdateonUpdate');
        },
        onChange(env) {
          ctx.emit('moveChange', env);
          console.log(env, 'onChangeonChangeonChangeonChangeonChange');
        },
      });
      const elRowWrapSort = new Sortable(elRowWrap.value, {
        group: {
          name: 'shared',
        },
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        // removeCloneOnHide: false,
        fallbackOnBody: true,
        animation: 150,
        // onAdd(evn) {
        //   console.log(evn, 'evnevnevnevnevnevnevnevnevnevnevnevn');
        // },
        onUpdate(env) {
          // console.log(env, 'onUpdateonUpdateonUpdateonUpdateonUpdate');
        },
        onChange(env) {
          ctx.emit('moveChange', env);
          console.log(env, 'onChangeonChangeonChangeonChangeonChange');
        },
      });
    });
    return {
      setAreaWrap,
      elColWrap,
      elRowWrap,
    };
  },
};
</script>

<style lang='less' scoped>
//.ContentTem-wrap{
//  width: 100%;
//  height: 100%;
//  min-height: 200px;
//  .left-item-wrap{
//    color: #ffffff;
//    width: 100%;
//    height: 30px;
//    background: red;
//  }
//  .content-item-wrap {
//    width: 100%;
//    height: 35px;
//    border: 1px solid #757575;
//    border-radius: 5px;
//    display: flex;
//    align-items: center;
//    justify-content: center;
//    margin: 10px 0;
//    cursor: pointer;
//    background: skyblue;
//    &:hover{
//      color: pink;
//      border: 1px solid pink;
//    }
//  }
//  .container-item-wrap{
//    width: 100%;
//    display: flex;
//    flex-direction: column;
//    border: 1px solid #757575;
//    background: skyblue;
//    min-height: 150px;
//    .container-item-wrap-title{
//      width: 100%;
//      height: 40px;
//    }
//    .container-item-wrap-content{
//      flex: 1;
//      min-height: 200px;
//      height: 100%;
//      width: 100%;
//      border: 1px dashed #757575;
//    }
//  }
//}
.set-area{
  min-height: 100%;
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
    min-height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid #757575;
      background: skyblue;
      .container-item-wrap-title {
        width: 100%;
        height: 40px;
      }
      .container-item-wrap-content{
        flex: 1;
        min-height: 200px;
        height: 200px;
        width: 100%;
        border: 1px dashed #757575;
      }
  }
}
</style>
