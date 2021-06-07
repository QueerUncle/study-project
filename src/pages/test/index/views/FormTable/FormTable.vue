<!--
  @Author: lize
  @Date: 2021/5/29
  @Description : 表单组件
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/29
 -->
<template>
  <div class="form-table-wrap">
<!--    左侧-->
    <div class = "left-wrap">
      <div class = "fields-list">
        <div v-for="(item, index) in fieldsList" :key = "index">
          <div class="field-title">{{item.title}}</div>
            <Draggable
              class = "oul"
              ghostClass="ghost"
              tag = "ul"
              :list = "item.list">
              <li
                class="field-label"
                v-for="(j, j_index) in item.list"
                :key = "j_index">
                <span
                  @click.stop = "handleFieldClick(j, TemplateList, selectWidget)">
                  {{j.label}}
                </span>
              </li>
            </Draggable>
        </div>
      </div>
    </div>
<!--    中间-->
    <div class = "widget-container">
      <div class = "widget-container-header">
        <div>
          <el-button
            size = "mini"
            type="text">
            撤销
          </el-button>
          <el-button
            size = "mini"
            type="text">
            重做
          </el-button>
          <el-button
            size = "mini"
            type="text" @click = "handleEmpty">
            清空
          </el-button>
        </div>
        <div>
          <el-button
            size = "mini"
            @click = "handleViewJson"
            type="text">
            ViewJson
          </el-button>
        </div>
      </div>
      <div class = "widget-container-content">
        <WidgetForm
          ref = "WidgetForm"
          :templateList = "TemplateList"
          :selectWidget = "selectWidget"
          :formValues = "FormValues"/>
      </div>
    </div>
<!--    右侧-->
    <div class = "widget-config-container">
      <WidgetConfig :selectWidget = "selectWidget" />
    </div>
  </div>
<!--  Json查看器-->
  <ViewJson :viewJsonOptions = "viewJsonOptions" v-if="viewJsonOptions.visible" />
</template>
<script lang='ts'>
import { reactive, ref } from 'vue';
import { useFormTable, handleFieldClick, handleEmpty } from './useFormTable';
import { fieldsList } from './fieldsConfig';
import WidgetForm from './WidgetForm.vue';
import ViewJson from './ViewJson.vue';
import WidgetConfig from './WidgetConfig.vue';

export default {
  name: 'FormTable',
  components: { WidgetForm, ViewJson, WidgetConfig },
  setup() {
    const fieldsListUlWrap = ref(null);
    const { TemplateList, selectWidget, FormValues } = useFormTable();
    const viewJsonOptions = reactive({
      visible: false,
      data: {},
    });
    // 查看json
    const handleViewJson = () => {
      viewJsonOptions.visible = true;
      viewJsonOptions.data = JSON.parse(JSON.stringify({
        TemplateList: TemplateList.value,
        FormValues: FormValues.value,
      }));
    };
    return {
      fieldsListUlWrap,
      fieldsList,
      TemplateList,
      viewJsonOptions,
      FormValues,
      selectWidget,
      handleFieldClick,
      handleViewJson,
      handleEmpty,
    };
  },
};
</script>

<style scoped lang='less'>
@import "./FormTable.less";
</style>
