// 手写一个new操作符功能
// 用法 myNew(构造函数)
function myNew() {
  // 生命一个控对象
  const obj = {};
  // 把类数组转为真正的数组,并拿到数组的第一项，得到一个需要实例化的构造函数。
  const Constructor = [].shift.call(arguments); // eslint-disable-line
  // 设置 对象obj的__proto__属性指向构造函数的原型。
  obj.__proto__ = Constructor.prototype; // eslint-disable-line
  // 将构造函数的this指向obj这个对象
  let ret = Constructor.apply(obj, arguments); // eslint-disable-line
  // 判断构造函数是否又返回值，有的话返回该函数的返回值，没有的话，返回定义的obj对象。
  return typeof ret === 'object' ? ret : obj; // eslint-disable-line
}
