export const fieldsList = [
  {
    title: '布局字段',
    list: [
      {
        type: 'group',
        label: '分组',
        icon: 'icon-group',
        display: true,
        arrow: false,
        collapse: true,
        children: {
          column: [],
        },
      },
    ],
  },
  {
    title: '输入字段',
    list: [
      {
        type: 'input',
        label: '单行文本',
        icon: 'icon-input',
        span: 24,
        display: true,
      },
      {
        type: 'password',
        label: '密码',
        icon: 'icon-password',
        span: 24,
        display: true,
      },
      {
        type: 'textarea',
        label: '多行文本',
        icon: 'icon-textarea',
        span: 24,
        display: true,
      },
      {
        type: 'number',
        label: '计数器',
        icon: 'icon-number',
        controls: true,
        span: 24,
        display: true,
      },
    ],
  },
  {
    title: '选择字段',
    list: [
      {
        type: 'select',
        label: '下拉选择器',
        icon: 'icon-select',
        dicData: [
          { label: '选项一', value: '0' },
          { label: '选项二', value: '1' },
          { label: '选项三', value: '2' },
        ],
        // 用于做级联配置
        cascaderItem: [],
        span: 24,
        display: true,
        dicOption: 'static',
        props: {
          label: 'label',
          value: 'value',
        },
      },
      {
        type: 'cascader',
        label: '级联选择器',
        icon: 'icon-link',
        span: 24,
        display: true,
        dicData: [
          {
            label: '选项一',
            value: 0,
            children: [{
              label: '选项1-1',
              value: 11,
            }, {
              label: '选项1-2',
              value: 12,
            }],
          },
          { label: '选项二', value: '1' },
          { label: '选项三', value: '2' },
        ],
        cascaderIndex: 1,
        showAllLevels: true,
        dicOption: 'static',
        separator: '/',
        props: {
          label: 'label',
          value: 'value',
        },
      },
    ],
  },
];
export const templateList = [];
export const formValues = {};
// 表单数据模型
export const ItemMouldValue = {
  value: '',
  label: '',
  disable: false,
  children: [],
};
// 表单模板模型
export const ItemMouldData = {
  id: '', // 元素ID，元素在表单中的唯一标识
  name: '', // 表单中显示名称
  type: '', // 类型
  elements: [], // 子元素(当type为group时，此字段有值)
  attributes: {
    type: '', // 组件类型
    fieldId: '', // 字段名
    dataKey: '',
    label: '', // 标题
    placeholder: '', // 占位提示
    layout: 24, // 栅格
    labelWidth: '90px', // 标签宽度
    controlWidth: '100%', // 控件宽度
    initial: '', // 默认值
    timeSlot: '', // 时间段
    timeFormat: '', // 时间格式
    labelShow: true, // 显示标签
    clearable: true, // 能否清空
    isForbid: false, // 是否禁用
    isRequired: false, // 是否必填
    isReadonly: false, // 是否只读
    multiple: false, // 是否可以多选，默认
    filterable: false, // 是否可以搜索，默认
    maxlength: 10,
    minlength: 2,
    prefixIcon: '',
    suffixIcon: '',
    showWordLimit: false, // 是否显示输入字数统计
    isShowAll: false, // 是否显示全选功能
    lastRow: false, // 是否是最后一行
    lastCol: false, // 是否是最后一列
    showAllLevels: true, // 是否显示级联的完整路径 默认 true
    rules: [], // 正则校验 { message: '', rule: '' }
    text: '', // button 按钮文字
    size: '', // / small / mini / medium
    componentType: '', // primary / success / warning / danger / info / text
    plain: false,
    round: false,
    circle: false,
    /* eslint-disable */ // 后续删除
    validate: true, // 校验通过标志
    limit: 3,   //  文件上传个数限制 默认 3
    accept: '', //文件上传类型
  }, // 控件属性
  options: [
    {
      'value': 'zhinan',
      'label': '指南',
      disable: false,
      'children': [
        {
          'value': 'shejiyuanze',
          'label': '设计原则',
          disable: false,
          'children': [
            {
              'value': 'yizhi',
              'label': '一致',
              disable: false,
            },
            {
              'value': 'fankui',
              'label': '反馈',
              disable: false,
            },
            {
              'value': 'xiaolv',
              'label': '效率',
              disable: false,
            },
            {
              'value': 'kekong',
              'label': '可控',
              disable: false,
            }
          ]
        },
        {
          'value': 'daohang',
          'label': '导航',
          disable: false,
          'children': [
            {
              'value': 'cexiangdaohang',
              'label': '侧向导航',
              disable: false,
            },
            {
              'value': 'dingbudaohang',
              'label': '顶部导航',
              disable: false,
            }
          ]
        }
      ]
    },
    {
      'value': 'zujian',
      'label': '组件',
      disable: false,
      'children': [
        {
          'value': 'basic',
          'label': 'Basic',
          disable: false,
          'children': [
            {
              'value': 'layout',
              'label': 'Layout 布局',
              disable: false,
            },
            {
              'value': 'color',
              'label': 'Color 色彩',
              disable: false,
            },
            {
              'value': 'typography',
              'label': 'Typography 字体',
              disable: false,
            },
            {
              'value': 'icon',
              'label': 'Icon 图标',
              disable: false,
            },
            {
              'value': 'button',
              'label': 'Button 按钮',
              disable: false,
            }
          ]
        },
        {
          'value': 'form',
          'label': 'Form',
          disable: false,
          'children': [
            {
              'value': 'radio',
              'label': 'Radio 单选框',
              disable: false,
            },
            {
              'value': 'checkbox',
              'label': 'Checkbox 多选框',
              disable: false,
            },
            {
              'value': 'input',
              'label': 'Input 输入框',
              disable: false,
            },
            {
              'value': 'input-number',
              'label': 'InputNumber 计数器',
              disable: false,
            },
            {
              'value': 'select',
              'label': 'Select 选择器',
              disable: false,
            },
            {
              'value': 'cascader',
              'label': 'Cascader 级联选择器',
              disable: false,
            },
            {
              'value': 'switch',
              'label': 'Switch 开关',
              disable: false,
            },
            {
              'value': 'slider',
              'label': 'Slider 滑块',
              disable: false,
            },
            {
              'value': 'time-picker',
              'label': 'TimePicker 时间选择器',
              disable: false,
            },
            {
              'value': 'date-picker',
              'label': 'DatePicker 日期选择器',
              disable: false,
            },
            {
              'value': 'datetime-picker',
              'label': 'DateRangePicker 日期时间选择器',
              disable: false,
            },
            {
              'value': 'upload',
              'label': 'Upload 上传',
              disable: false,
            },
            {
              'value': 'rate',
              'label': 'Rate 评分',
              disable: false,
            },
            {
              'value': 'form',
              'label': 'Form 表单',
              disable: false,
            }
          ]
        },
        {
          'value': 'data',
          'label': 'Data',
          disable: false,
          'children': [
            {
              'value': 'table',
              'label': 'Table 表格',
              disable: false,
            },
            {
              'value': 'tag',
              'label': 'Tag 标签',
              disable: false,
            },
            {
              'value': 'progress',
              'label': 'Progress 进度条',
              disable: false,
            },
            {
              'value': 'tree',
              'label': 'Tree 树形控件',
              disable: false,
            },
            {
              'value': 'pagination',
              'label': 'Pagination 分页',
              disable: false,
            },
            {
              'value': 'badge',
              'label': 'Badge 标记',
              disable: false,
            }
          ]
        },
        {
          'value': 'notice',
          'label': 'Notice',
          disable: false,
          'children': [
            {
              'value': 'alert',
              'label': 'Alert 警告',
              disable: false,
            },
            {
              'value': 'loading',
              'label': 'Loading 加载',
              disable: false,
            },
            {
              'value': 'message',
              'label': 'Message 消息提示',
              disable: false,
            },
            {
              'value': 'message-box',
              'label': 'MessageBox 弹框',
              disable: false,
            },
            {
              'value': 'notification',
              'label': 'Notification 通知',
              disable: false,
            }
          ]
        },
        {
          'value': 'navigation',
          'label': 'Navigation',
          disable: false,
          'children': [
            {
              'value': 'menu',
              'label': 'NavMenu 导航菜单',
              disable: false,
            },
            {
              'value': 'tabs',
              'label': 'Tabs 标签页',
              disable: false,
            },
            {
              'value': 'breadcrumb',
              'label': 'Breadcrumb 面包屑',
              disable: false,
            },
            {
              'value': 'dropdown',
              'label': 'Dropdown 下拉菜单',
              disable: false,
            },
            {
              'value': 'steps',
              'label': 'Steps 步骤条',
              disable: false,
            }
          ]
        },
        {
          'value': 'others',
          'label': 'Others',
          disable: false,
          'children': [
            {
              'value': 'dialog',
              'label': 'Dialog 对话框',
              disable: false,
            },
            {
              'value': 'tooltip',
              'label': 'Tooltip 文字提示',
              disable: false,
            },
            {
              'value': 'popover',
              'label': 'Popover 弹出框',
              disable: false,
            },
            {
              'value': 'card',
              'label': 'Card 卡片',
              disable: false,
            },
            {
              'value': 'carousel',
              'label': 'Carousel 走马灯',
              disable: false,
            },
            {
              'value': 'collapse',
              'label': 'Collapse 折叠面板',
              disable: false,
            }
          ]
        }
      ]
    },
    {
      'value': 'ziyuan',
      'label': '资源',
      disable: false,
      'children': [
        {
          'value': 'axure',
          'label': 'Axure Components',
          disable: false,
        },
        {
          'value': 'sketch',
          'label': 'Sketch Templates',
          disable: false,
        },
        {
          'value': 'jiaohu',
          'label': '组件交互文档',
          disable: false,
        }
      ]
    }
  ], // 下拉选项/单/多选框属性  测试数据，后续删除
  selectKey: '',
};
