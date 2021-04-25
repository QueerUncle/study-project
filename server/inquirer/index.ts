/*
  @Author: lize
  @Date: 2021/4/9
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/9
 */
const Inquirer = require('inquirer');
const promptList = require('./promptList.ts');
module.exports = () => Inquirer.prompt(promptList);
