<!--
  @Author: lize
  @Date: 2021/3/26
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/26
 -->
<template>
  <div class="study-wrap">
    <div class = "item-wrap">
      <h1>水平居中、垂直居中、画一条0.5px的直线</h1>
      <div style="display: flex">
        <div class = "example-box-wrap">
          <div class = "example-box-child-wrap">
            <div class = "example-box-line-wrap"></div>
          </div>
        </div>
        <div class = "extend-"></div>
      </div>
    </div>
  </div>
  <button @click = "linkTo">跳转</button>
<!--  <router-view></router-view>-->
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import LinkedList from './LinkedList';

const { lize } = window as any;

console.log(lize, 'lizelizelizelizelizelizelizelizelizelize');
export default {
  name: 'Study',
  setup() {
    LinkedList.insert('Apple');
    LinkedList.insert('Banana', 'Apple');
    LinkedList.insert('Pear', 'Banana');
    LinkedList.insert('Grape', 'Pear');
    LinkedList.display();
    console.log('0-------');
    LinkedList.remove('Banana');
    LinkedList.display();
    console.log('1-------');
    LinkedList.reverseList();
    console.log(LinkedList.removeNthFromEnd(2));
    const Router = useRouter();
    const linkTo = () => {
      Router.push({
        path: '/Study/VUE3Test',
      });
    };
    return {
      linkTo,
    };
  },
};
</script>

<style scoped lang='less'>
.study-wrap{
  width: 100vw;
  height: 100vh;
  .item-wrap{
    .example-box-wrap{
      width: 300px;
      height: 300px;
      background: #409EFF;
      position: relative;
      .example-box-child-wrap{
        width: 100px;
        height: 100px;
        background: palegoldenrod;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        .example-box-line-wrap{
          width: 50px;
          margin: 0 auto;
          height: 1px;
          background: pink;
          transform: scale(0.5);
        }
      }
    }
  }
}
</style>
