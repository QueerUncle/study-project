<!--
  @Author: lize
  @Date: 2021/3/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/3/18
 -->
<template>
  <div class="vue3-test-wrap">
    VUE3Test<br/>
    {{modelValue}}----{{fooValue}}
    <CustomInput
      :modelInfo = "modelInfo"
      v-model = "modelValue" v-model:foo = "fooValue" :arr = "aloneCheckboxC"/>
<!--    <input name = "aaa" label = "ccccc" type="checkbox"-->
<!--    v-model = "checked" @change = "handleChange" />-->
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
    <CustomCheckboxGroup
      v-model="aloneCheckboxC"
      :disabled="false"
      @change="changeCheckboxGroup">
      <CustomCheckbox
        v-for="(item, index) in resData"
        :itemData="item"
        :label="item.value"
        :key="index">
          {{ item.label }}
      </CustomCheckbox>
    </CustomCheckboxGroup>
  </div>
  <el-cascader
    v-model = "qwer"
    @change = "cascaderChange"
    :options="optionsasdasd" clearable />
  {{qwer}}
</template>

<script lang='ts'>
/* eslint-disable */
import {
  ref, computed, reactive, watch, onMounted,
} from 'vue';
import CustomInput from '../components/CustomInput.vue';
import CustomCheckboxGroup from '../components/CheckboxCom/CustomCheckboxGroup.vue';
import CustomCheckbox from '../components/CheckboxCom/CustomCheckbox.vue';

export default {
  name: 'VUE3Test',
  components: { CustomInput, CustomCheckboxGroup, CustomCheckbox },
  setup(props, ctx) {
    console.log(props, ctx);
    const qwer = ref([]);
    const cascaderChange = (ewr) => {
      console.log(ewr, qwer, 'qwerqwerqwerqwerqwer');
    };
    onMounted(() => {
      qwer.value = ['zhinan' ,'shejiyuanze', 'yizhi'];
    });
    const optionsasdasd = reactive([{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }, {
        value: 'daohang',
        label: '导航',
        children: [{
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
          value: 'dingbudaohang',
          label: '顶部导航'
        }]
      }]
    }, {
      value: 'zujian',
      label: '组件',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout 布局'
        }, {
          value: 'color',
          label: 'Color 色彩'
        }, {
          value: 'typography',
          label: 'Typography 字体'
        }, {
          value: 'icon',
          label: 'Icon 图标'
        }, {
          value: 'button',
          label: 'Button 按钮'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio 单选框'
        }, {
          value: 'checkbox',
          label: 'Checkbox 多选框'
        }, {
          value: 'input',
          label: 'Input 输入框'
        }, {
          value: 'input-number',
          label: 'InputNumber 计数器'
        }, {
          value: 'select',
          label: 'Select 选择器'
        }, {
          value: 'cascader',
          label: 'Cascader 级联选择器'
        }, {
          value: 'switch',
          label: 'Switch 开关'
        }, {
          value: 'slider',
          label: 'Slider 滑块'
        }, {
          value: 'time-picker',
          label: 'TimePicker 时间选择器'
        }, {
          value: 'date-picker',
          label: 'DatePicker 日期选择器'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker 日期时间选择器'
        }, {
          value: 'upload',
          label: 'Upload 上传'
        }, {
          value: 'rate',
          label: 'Rate 评分'
        }, {
          value: 'form',
          label: 'Form 表单'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table 表格'
        }, {
          value: 'tag',
          label: 'Tag 标签'
        }, {
          value: 'progress',
          label: 'Progress 进度条'
        }, {
          value: 'tree',
          label: 'Tree 树形控件'
        }, {
          value: 'pagination',
          label: 'Pagination 分页'
        }, {
          value: 'badge',
          label: 'Badge 标记'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert 警告'
        }, {
          value: 'loading',
          label: 'Loading 加载'
        }, {
          value: 'message',
          label: 'Message 消息提示'
        }, {
          value: 'message-box',
          label: 'MessageBox 弹框'
        }, {
          value: 'notification',
          label: 'Notification 通知'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu 导航菜单'
        }, {
          value: 'tabs',
          label: 'Tabs 标签页'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb 面包屑'
        }, {
          value: 'dropdown',
          label: 'Dropdown 下拉菜单'
        }, {
          value: 'steps',
          label: 'Steps 步骤条'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog 对话框'
        }, {
          value: 'tooltip',
          label: 'Tooltip 文字提示'
        }, {
          value: 'popover',
          label: 'Popover 弹出框'
        }, {
          value: 'card',
          label: 'Card 卡片'
        }, {
          value: 'carousel',
          label: 'Carousel 走马灯'
        }, {
          value: 'collapse',
          label: 'Collapse 折叠面板'
        }]
      }]
    }, {
      value: 'ziyuan',
      label: '资源',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'jiaohu',
        label: '组件交互文档'
      }]
    }]);
    const checkList = ref(['选中且禁用', '复选框 A']);
    const modelValue = ref('李泽');
    const fooValue = ref('aaaaa');
    const modelInfo = reactive({
      id: '1',
      name: 'lize',
      attr: {
        template: 'asdasdad',
        forntId: 'asdasdasd9879798',
      },
    });
    // const checked = ref([]);
    const checked = ref(false);
    const aloneCheckboxC = ref([
      {
        value: 'c_0003',
        label: '复选框 C',
        disabled: false,
      },
    ]);
    const resData = [
      {
        value: 'a_0001',
        label: '复选框 A',
        disabled: false,
      },
      {
        value: 'b_0002',
        label: '复选框 B',
        disabled: true,
      },
      {
        value: 'c_0003',
        label: '复选框 C',
        disabled: false,
      },
    ];
    const handleChange = (event) => {
      console.log(event);
      console.log(checked);
    };
    const changeCheckboxGroup = (data) => {
      console.log(data);
    };
    const age = ref(10);
    const ageCom = computed({
      get() {
        return age;
      },
      set(value) {
        console.log(value, '我发生了更扁');
        age.value += (value as number);
      },
    });
    ageCom.value = 10;
    console.log(age);
    console.log(modelInfo, 'modelInfomodelInfomodelInfo');
    return {
      checkList,
      modelValue,
      fooValue,
      checked,
      handleChange,
      aloneCheckboxC,
      resData,
      changeCheckboxGroup,
      modelInfo,
      optionsasdasd,
      cascaderChange,
      qwer,
    };
  },
};
</script>

<style scoped lang='less'>
</style>
