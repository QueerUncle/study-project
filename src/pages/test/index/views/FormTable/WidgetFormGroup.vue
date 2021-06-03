<!--
  @Author: lize
  @Date: 2021/5/30
  @Description : 组类型组件
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/30
 -->
<template>
  <div>
    <h4
      class="widget-form-group__head"
      v-show="Column.label || Column.name">
      {{Column.label || Column.name}}
    </h4>
    <Draggable
      style="display: flex;flex-direction: column"
      :list = "Column.elements"
      tag = "el-row"
      :key = "Column.elements.length"
      class="widget-form-group__body"
      :group="{name: 'form', pull: 'clone', put: true}"
      :sort = "true"
      @dragAdd = "(evt) => handleDragAdd(evt, Column.elements, FormValues, SelectWidget)"
      @dragRemove = "(evt) => handleDragRemove(evt, Column.elements, FormValues, SelectWidget)"
      ghost-class="ghost">
      <el-col
        type = "flex"
        style = "flex:none"
        v-for="(item, index) in Column.elements"
        :key = "index"
        :span = "item.attributes.layout"
        :xs="24">
        <div
          style = "display: flex"
          :class = "{'active': selectWidget.id === item.id }"
          @click.stop = "handleSelectWidget(SelectWidget, index, Column.elements)"
          class="widget-form-item">
          <div class = "label-wrap">{{item.label || item.name}}</div>
          <div class = "form-item-wrap">
            <el-input placeholder="请输入内容"></el-input>
          </div>
          <div class = "icon-wrap" v-if="selectWidget.id === item.id">
            <i
              class="el-icon-delete"
              @click="handleDelete(index,item,Column.elements,FormValues[Column.id],SelectWidget)"/>
          </div>
        </div>
      </el-col>
    </Draggable>
  </div>
</template>
<script lang='ts'>
import { reactive } from 'vue';
import {
  handleDragAdd, handleDragRemove, handleDelete, handleSelectWidget,
} from './useFormTable';

export default {
  name: 'WidgetFormGroup',
  props: {
    column: Object,
    selectWidget: Object,
    formValues: Object,
  },
  setup(props) {
    const Column = reactive(props.column);
    const FormValues = reactive(props.formValues);
    const SelectWidget = reactive(props.selectWidget);
    return {
      Column,
      FormValues,
      SelectWidget,
      handleDragAdd,
      handleDragRemove,
      handleSelectWidget,
      handleDelete,
    };
  },
};
</script>

<style scoped lang='less'>
.widget-form-group__head{
  margin: 10px;
}
.widget-form-group__body{
  min-height: 150px;
  height: 100%;
  outline: 1px dashed #ccc;
  outline-offset: -1px;
  overflow: hidden;
  padding-bottom: 15px;
}
.widget-form-item{
  display: flex;
  min-height: 55px;
  padding: 5px 10px 18px;
  margin: 0;
  position: relative;
  .label-wrap{
    width:120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-item-wrap{
    flex:2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: block;
    z-index: 1001;
  }
}
.active{
  outline: 1px solid #409eff;
  outline-offset: -1px;
}
.icon-wrap{
  position: absolute;
  bottom: -10px;
  right: 20px;
  cursor: pointer!important;
  i{
    font-size: 20px;
    &:hover{
      color: #409EFF;
    }
  }
}
</style>
