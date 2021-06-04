<!--
  @Author: lize
  @Date: 2021/5/29
  @Description : 中间区域
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/29
 -->
<template>
  <div class="widget-form-container">
    <div class = "from-wrap">
<!--      <el-row>-->
        <Draggable
          :list = "TemplateList"
          :group="{name: 'form', pull: 'clone', put: true }"
          :key = "TemplateList.length"
          ghostClass="ghost"
          :sort = "true"
          tag = "el-row"
          style="display: flex; flex-direction: column"
          @dragAdd = "(evt) => handleDragAdd(evt, TemplateList, FormValues, SelectWidget)"
          @dragRemove = "(evt) => handleDragRemove(evt, TemplateList, FormValues, SelectWidget)"
          class="widget-form-list">
          <el-col
            style="flex: none"
            type = 'flex'
            v-for="(item, index) in templateList"
            :key = "index"
            :span = "item.attributes.layout"
            :xs="24">
            <div>
              <div
                :class = "{'active': SelectWidget.id === item.id }"
                class="widget-form-group"
                :key = "index"
                @click = "handleSelectWidget(SelectWidget, index, TemplateList)"
                v-if="item.type === 'group'">
                <WidgetFormGroup
                  :selectWidget = "SelectWidget"
                  :column = "item"
                  :formValues = "formValues" />
                <div class = "icon-wrap" v-if="SelectWidget.id === item.id">
                  <i
                    class="el-icon-delete"
                    @click = "handleDelete(index, item, TemplateList, FormValues, SelectWidget)" />
                </div>
              </div>
              <div
                v-else
                :key = "'noGroup' + index"
                style = "display: flex"
                @click = "handleSelectWidget(SelectWidget, index, TemplateList)"
                :class = "{'active': SelectWidget.id === item.id }"
                class="widget-form-item">
                <div class = "label-wrap">{{item.label || item.name}}</div>
                <div class = "form-item-wrap">
                  <el-input v- type = "text" placeholder="请输入内容" />
                </div>
                <div class = "icon-wrap" v-if="SelectWidget.id === item.id">
                  <i
                    class="el-icon-delete"
                    @click = "handleDelete(index, item, TemplateList, FormValues, SelectWidget)" />
                </div>
              </div>
            </div>
          </el-col>
        </Draggable>
<!--      </el-row>-->
    </div>
  </div>
</template>
<script lang='ts'>
import { computed } from 'vue';
import WidgetFormGroup from './WidgetFormGroup.vue';
import {
  handleDragAdd, handleDragRemove, handleDelete, handleSelectWidget,
} from './useFormTable';

export default {
  name: 'WidgetForm',
  components: { WidgetFormGroup },
  props: {
    templateList: Array,
    formValues: Object,
    selectWidget: Object,
  },
  setup(props) {
    const TemplateList = computed(() => props.templateList);
    const FormValues = computed(() => props.formValues);
    const SelectWidget = computed(() => props.selectWidget);
    return {
      TemplateList,
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
.from-wrap{
  height: 100%;
    .widget-form-list{
      width: 100%;
      height: 100%;
      min-height: calc(100% - 45px);
      padding-bottom: 50px;
      overflow: hidden;
      overflow-y: scroll;
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
        :hover{
          background: #ecf8ff;
          cursor: move;
        }
      }
      .widget-form-group{
        position: relative;
        width: 100%;
        float: left;
        padding: 2px;
        :hover{
          background: #ecf8ff;
          cursor: move;
        }
      }
      .active{
        border-left: 3px solid #409eff;
        background: #ecf5ff;
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
    }
}
</style>
