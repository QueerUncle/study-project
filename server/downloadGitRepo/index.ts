/*
  @Author: lize
  @Date: 2021/4/9
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/9
 */
const downloadGitRepo = require('download-git-repo'); // 下载工具
const ora = require('ora'); // 进度条

module.exports = (url, name) => {
  const progressBar = ora('拉取模板......');
  progressBar.start();
  downloadGitRepo(url, name, { clone: false }, (err) => {
    progressBar.stop();
    console.log(err ? err : '拉取模板完毕'); // eslint-disable-line
    process.exit(1); // eslint-disable-line
  });
};
