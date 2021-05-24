/*
  @Author: lize
  @Date: 2021/5/20
  @Description :
  @Param :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/20
 */
<<<<<<< HEAD
=======
// eslint-disable-next-line max-classes-per-file
const getData = (data, vm) => data.call(vm, vm);
>>>>>>> 92dfba850b5260ccd4c90d7bbb71a344a7cdb4f7
function initWatch(vm, watch) {
  for (let key in watch) { // eslint-disable-line
    new Watcher(vm, key, watch[key]); // eslint-disable-line
  }
}
// -----------新增Dep类 用于收集watcher
// eslint-disable-next-line max-classes-per-file
class Dep {
  constructor() {
    this.dep = [];
  }
  addDep(dep) {
    this.dep.push(dep);
  }
  notify() {
    // 通知所有的watcher执行更新
    this.dep.forEach((watcher) => {
      // eslint-disable-next-line no-unused-expressions
      watcher.update();
    });
  }
}
// -----------新增Watcher类 用于根据通知触发绑定的回调函数
// eslint-disable-next-line max-classes-per-file
class Watcher {
  constructor(vm, key, cb) {
    this.$vm = vm;
    this.$key = key;
    this.$cb = cb;
    // 将Dep.targat绑定上watcher
    Dep.target = this;
    // 实际是访问了this.name，触发了当前变量的get，
    // 当前变量的get会收集当前Dep.target指向的watcher,即当前watcher
    this.$vm[this.$key]; // eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // this.update();
    Dep.target = null;
  }
  update() {
    // 执行
    console.log('wolaile', this.$key);
    this.$cb.call(this.$vm, this.$vm[this.$key]);
  }
}

class LVue {
  constructor(options) {
    // 响应式
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods;
    // 数据劫持
    // 监听数据并且做代理 使得访问this.name即可访问到this.$data.name
    this.observer(this.$data);
    // 初始化watch
    initWatch(this, options.watch);

    new Compile(options.el, this);
    // 这一步会触发name与$data.$name的get方法 所以先回打印出get里面的内容
    // 生命周期
    if (options.created) {
      options.created.call(this);
    }
  }
  // 观察者
  // eslint-disable-next-line class-methods-use-this
  observer(obj) {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach((key) => {
      this.defineProperty(obj, key, obj[key]);
      this.proxyObj(key);
    });
  }
  defineProperty(obj, key, val) {
    // 如果是绑定的是对象，则用迭代的方式，继续监听对象中的数据
    this.observer(val);
    // ---------------- 新增为每一个变量都创建管理watcher的Dep实例
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const dep = new Dep();
    // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，
    // 或者修改一个对象的现有属性， 并返回这个对象。
    Object.defineProperty(obj, key, {
      get() {
        console.log('defineProperty获取', Dep.target);
        // 每次访问name 都会创建一个watcher，并加入到Dep中
        // eslint-disable-next-line no-unused-expressions,@typescript-eslint/no-use-before-define
        Dep.target !== null && dep.addDep(Dep.target)
        return val;
      },
      set(newVal) {
        // 采用闭包的形式，只要Wvue没有销毁，则val会一直存在
        console.log('defineProperty更新了', newVal);
        val = newVal; // eslint-disable-line
        dep.notify();
      },
    });
  }
  proxyObj(key) {
    Object.defineProperty(this, key, {
      get() {
        console.log('proxyObj获取');
        return this.$data[key];
      },
      set(newVal) {
        console.log('proxyObj更新', newVal);
        this.$data[key] = newVal;
      },
    });
  }
}
class Compile {
  // vm是指vue的this，el用来获取html数据
  constructor(el, vm) {
    this.$vm = vm;
    // $el挂载的就是需要处理的DOM
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.$fragment = this.nodeFragment(this.$el);
      // 执行编译
      this.compileNode(this.$fragment);
      // 将编译后的元素添加到el
      this.$el.appendChild(this.$fragment);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  nodeFragment(el) {
    // DocumentFragment节点不属于文档树，继承的parentNode属性总是null。
    // 它有一个很实用的特点，当请求把一个DocumentFragment节点插入文档树时，
    // 插入的不是DocumentFragment自身，而是它的所有子孙节点，即插入的是括号里的节点。
    // 这个特性使得DocumentFragment成了占位符，暂时存放那些一次插入文档的节点。
    // 它还有利于实现文档的剪切、复制和粘贴操作。
    // 另外，当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，
    // 再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升。
    // 如果使用appendChid方法将原dom树中的节点添加到DocumentFragment中时，会删除原来的节点

    // 创建一个虚拟的节点对象
    const frag = document.createDocumentFragment();
    // 将el的子元素添加到createDocumentFragment节点
    let child;
    // eslint-disable-next-line no-cond-assign
    while ((child = el.firstChild)) {
      // 使用appendChid方法在向frag添加子元素的同时删除了el的子元素
      frag.appendChild(child);
    }
    return frag;
  }
  // 通过迭代循环来找出{{}}中的内容，v-xxx与@xxx的内容，并且单独处理
  compileNode(frag) {
    const nodes = frag.childNodes;
    // 类数组的循环
    Array.from(nodes).forEach((node) => {
      // html文档中的回车空格等也是一个node节点（#text）
      // console.log(frag,node,node.nodeType)
      // 如果是node节点
      if (this.isElement(node)) {
        this.compileElement(node); // 解读节点上的指令及指令和事件
      }
      // 如果是文本节点
      if (this.isTextNode(node)) {
        // this.compileText(node, this.$vm);
        this.compileText(node);
      }
      if (node.childNodes && node.childNodes.length) {
        // 递归
        this.compileNode(node);
      }
    });
  }
  // update(node, vm, exp, type) {
  //   const updateFn = this[`update${type}`];
  //   // 依赖绑定
  //   new Watcher(vm, exp, (value) => { // eslint-disable-line
  //     updateFn && updateFn(node, value); // eslint-disable-line
  //   });
  // }
  // nodeType 属性返回以数字值返回指定节点的节点类型
  // Node.ELEMENT_NODE  1   一个 元素 节点，例如 <p> 和 <div>。
  // Node.TEXT_NODE 3   Element 或者 Attr 中实际的  文字
  // Node.CDATA_SECTION_NODE    4   一个 CDATASection，例如 <!CDATA[[ … ]]>。
  // Node.PROCESSING_INSTRUCTION_NODE   7   一个用于XML文档的 ProcessingInstruction ，
  // 例如 <?xml-stylesheet ... ?> 声明。
  // Node.COMMENT_NODE  8   一个 Comment 节点。
  // Node.DOCUMENT_NODE 9   一个 Document 节点。
  // Node.DOCUMENT_TYPE_NODE    10  描述文档类型的 DocumentType 节点。
  // 例如 <!DOCTYPE html>  就是用于 HTML5 的。
  // Node.DOCUMENT_FRAGMENT_NODE    11  一个 DocumentFragment 节点

  // eslint-disable-next-line class-methods-use-this
  isElement(node) {
    return node.nodeType === 1;
  }
  // 校验是否是文本节点 并且是大括号中的内容
  // eslint-disable-next-line class-methods-use-this
  isTextNode(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  // 是否是指令，以k-开头
  // eslint-disable-next-line class-methods-use-this
  isDirective(attrName) {
    return attrName.startsWith('l-');
  }
  // 是否是方法
  // eslint-disable-next-line class-methods-use-this
  isEvent(attrName) {
    return attrName.startsWith('@');
  }
  // 文本节点处理方法
  compileText(node) {
    // const execs = defaultTagRE.exec(node.textContent);
    // if (execs) {
    //   const exp = execs[1].trimStart().trimEnd();
    //   this.update(node, vm, exp, 'TextNode');
    //   // 有多个{{}}时需要进行递归修改
    //   this.compileText(node, vm);
    const reg = /\{\{(.*?)\}\}/g;
    const string = node.textContent.match(reg);
    // 取出大括号中的内容，并且处理
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    // 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
    this.text(node, RegExp.$1);
  }
  // 如果是一个元素节点则获取它的attributes，根据attributes来获取指令和方法绑定等
  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      const { name, value } = attr;
      // 如果是指令
      if (this.isDirective(name)) {
        // 获取指令名称
        const directive = name.substring(2);
        // 如果存在这个指令，则执行这个指令
        // eslint-disable-next-line no-unused-expressions
        this[directive] && this[directive](node, value);
      }
      // 如果是事件
      if (this.isEvent(name)) {
        // 指定事件名。
        const event = name.substring(1);
        this.eventHandler(node, event, value);
      }
    });
  }
  // 因为是大括号里面的内容，所以沿用之前的逻辑，都加上watcher
  text(node, key) {
    new Watcher(this.$vm, key, () => { // eslint-disable-line
      node.textContent = this.$vm[key]; // eslint-disable-line
    });
    // 第一次初始化界面， 不然如果不进行赋值操作，
    // 就不会触发watcher里面的回调函数
    node.textContent = this.$vm[key]; // eslint-disable-line
  }
  html(node, key) {
    new Watcher(this.$vm, key, () => { // eslint-disable-line
      node.innerHTML = this.$vm[key]; // eslint-disable-line
    });
    node.innerHTML = this.$vm[key]; // eslint-disable-line
  }
  // 对@xxx事件的处理
  // eslint-disable-next-line class-methods-use-this
  eventHandler(node, event, methodName) {
    node.addEventListener(event, () => {
      this.$vm.$methods[methodName].call(this.$vm);
    });
  }
  // v-modal的处理 不仅仅当赋值的时候回触发watcher，并且为input添加事件
  // input中的值去修改this.$data.$xxx的值，实现双向绑定
  modal(node, key) {
    new Watcher(this.$vm, key, () => {  // eslint-disable-line
      console.log('laile');
      node.value = this.$vm[key];  // eslint-disable-line
    });
    node.value = this.$vm[key]; // eslint-disable-line
    node.addEventListener('input', (e) => {
      this.$vm[key] = e.target.value;
      // this.$vm.$data[key] = e.target.value;
    });
  }
}
