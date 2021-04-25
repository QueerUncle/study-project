/*
  @Author: lize
  @Date: 2021/4/2
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/2
 */
class EventCenter {
  static events = {};

  $on(type, fn) { // eslint-disable-line
    if (!EventCenter.events[type]) {
      EventCenter.events[type] = [];
    }
    EventCenter.events[type].push(fn);
  }

  $once(type, fn) { // eslint-disable-line
    const key = `${type}once`;
    if (!EventCenter.events[key]) {
      EventCenter.events[key] = fn;
    }
  }

  $emit(...values) { // eslint-disable-line
    const type = Array.prototype.shift.call(values); // 截取第一个参数
    const onFunctions = EventCenter.events[type];
    const onceFunctions = EventCenter.events[`${type}once`];
    const isOnFunctions = onFunctions && onFunctions.length;
    const isOnceFunctions = onceFunctions;
    if (!isOnFunctions && !isOnceFunctions) return;
    if (isOnFunctions) {
      for (let i = 0; i < onFunctions.length; i += 1) {
        onFunctions[i].apply(this, values);
      }
    }
    if (isOnceFunctions) {
      onceFunctions.apply(this, values);
      delete EventCenter.events[`${type}once`];
    }
  }

  $off(type, fn) { // eslint-disable-line
    if (!type) {
      EventCenter.events = Object.create(null);
      return;
    }
    const fns = EventCenter.events[type];
    if (!fns) return;
    if (!fn) {
      delete EventCenter.events[type];
      return;
    }
    for (let i = 0; i < fns.length; i += 1) {
      if (fns[i] === fn) {
        EventCenter.events[type].splice(i, 1);
        if (!EventCenter.events[type].length) {
          delete EventCenter.events[type];
          return;
        }
      }
    }
  }
}
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = new EventCenter() : window.EventCenter = new EventCenter(); // eslint-disable-line
