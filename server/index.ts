#!/usr/bin/env node
const program = require('commander'); // 命令行参数解析工具
const chalk = require('chalk'); // 输出颜色工具
const downloadGit = require('./downloadGitRepo/index.ts'); // 下载
const inquirer = require('./inquirer/index.ts'); // 问题
const log = console.log; // eslint-disable-line
// const url = 'QueerUncle/test'; // 模版所在为止 默认为gitHub, 也可以是全局的
const url = 'QueerUncle/vue_node_compile'; // 模版所在为止 默认为gitHub, 也可以是全局的

program
  .command('create <name> [otherDirs...]')
  .description('lz-cli初始化项目')
  .action(async (options, otherDirs) => {
    log(options, otherDirs);
    if (!options) {
      log(chalk.red('缺少必要参数name'));
      process.exit(1); // eslint-disable-line
      return;
    }
    // const userResult = await inquirer(); // eslint-disable-line
    // log(userResult);
    log(chalk.yellow('正在初始化***'));
    downloadGit(url, options);
  });
program.parse(process.argv); // eslint-disable-line

