/*
  @Author: lize
  @Date: 2021/4/25
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/25
 */
const CreateSingle = (Fn) => {
  let instance;
  return (name) => instance || (instance = new Fn(name)); // eslint-disable-line
};

const Single = (text) => {
  const msg = document.createElement('div');
  msg.innerHTML = text;
  msg.style.display = 'none';
  document.body.appendChild(msg);
};

const msgBox = CreateSingle(Single);
document.onclick = () => {
  const msgEl = msgBox('这里是弹窗的内容');
  msgEl.style.display = 'block';
};
