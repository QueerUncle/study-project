/*
  @Author: lize
  @Date: 2021/4/9
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/9
 */
module.exports = [
  {
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: 'test_user', // 默认值
  },
  {
    type: 'input',
    message: '请输入手机号:',
    name: 'phone',
    validate(val) {
      if (val.match(/\d{11}/g)) { // 校验位数
        return true;
      }
      return '请输入11位数字';
    },
  },
  {
    type: 'password', // 密码为密文输入
    message: '请输入密码：',
    name: 'pwd',
  },
  {
    type: 'rawlist', // 可以输入行号
    message: '请选择一种水果:',
    name: 'fruitssssss',
    choices: [
      'Apple',
      'Pear',
      'Banana',
    ],
  },
  {
    type: 'confirm',
    message: '是否使用监听？',
    name: 'watch',
    prefix: '前缀',
  },
  {
    type: 'confirm',
    message: '是否进行文件过滤？',
    name: 'filter',
    suffix: '后缀',
    when(answers) { // 当watch为true的时候才会提问当前问题
      return answers.watch;
    },
  },
  {
    type: 'list', // 单选
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
      'Apple',
      'Pear',
      'Banana',
    ],
    filter(val) { // 使用filter将回答变为小写
      return val.toLowerCase();
    },
  },
  {
    type: 'checkbox',
    message: '选择颜色:',
    name: 'color',
    choices: [
      'red',
      'blur',
      'green',
      'yellow',
    ],
    pageSize: 2, // 设置行数
  },
  {
    type: 'expand', // 模糊查询
    message: '请选择一种水果：',
    name: 'fruits',
    choices: [
      {
        key: 'a',
        name: 'Apple',
        value: 'apple',
      },
      {
        key: 'O',
        name: 'Orange',
        value: 'orange',
      },
      {
        key: 'p',
        name: 'Pear',
        value: 'pear',
      },
    ],
  },
  {
    type: 'editor',
    message: '请输入备注：',
    name: 'editor',
  },
];
