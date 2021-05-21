/*
  @Author: lize
  @Date: 2021/5/20
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/20
 */
const ProxyConsole = new Proxy(console, {
  set(target, propKey, value, receiver) {
    return Reflect.set(target, propKey, value, receiver);
  },
});
ProxyConsole['logString'] = (...argv) => { // eslint-disable-line
  console.log(...JSON.parse(JSON.stringify(argv)));
};
console = ProxyConsole; // eslint-disable-line
