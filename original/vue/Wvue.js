class Wvue {
  constructor(option) {
    this.$option = option
    this.$data = option.data
    this.$methods = option.methods
    this.observer(this.$data)
    // ----------------新增Watcher实例，绑定回调方法，当收到通知，打印数据
    new Watcher(this, 'name', () => {
      console.log('watcher生效')
    })
    console.log(this.name)
    setTimeout(() => {
      console.log('数据发送变化-----------------------------')
      this.name = '可爱米粒'
    }, 2000)
    // new Compile(option.el, this);
  }
  observer(obj) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    console.log('observer')
    Object.keys(obj).forEach(key => {
      this.defineProperty(obj, key, obj[key])
      this.proxyObj(key)
    })
  }
  defineProperty(obj, key, val) {
    this.observer(val)
    //---------------- 新增为每一个变量都创建管理watcher的Dep实例
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        console.log('defineProperty获取', Dep.target);
        // 每次访问name 都会创建一个watcher，并加入到Dep中
        Dep.target !== null && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        console.log('defineProperty更新了', newVal)
        val = newVal
        dep.notify()
      }
    })
  }

  proxyObj(key) {
    Object.defineProperty(this, key, {
      get() {
        console.log('proxyObj获取')
        return this.$data[key]
      },
      set(newVal) {
        console.log('proxyObj更新', newVal)
        this.$data[key] = newVal
      }
    })

  }
}
// -----------新增Watcher类 用于根据通知触发绑定的回调函数
class Watcher {
  constructor(vm, key ,cb) {
    this.$vm = vm
    this.$key = key
    this.$cb = cb
    // 用一个全局变量来指代当前watch
    Dep.target = this
    console.log('Watcher-------')
    // 实际是访问了this.name，触发了当前变量的get，
    // 当前变量的get会收集当前Dep.target指向的watcher,即当前watcher
    this.$vm[this.$key]
    Dep.target = null

  }
  update() {
    // 执行
    this.$cb.call(this.$vm, this.$vm[this.$key])
  }
}
// -----------新增Dep类 用于收集watcher
class Dep {
  constructor() {
    this.dep = []
  }
  addDep(dep) {
    console.log('addDep')
    this.dep.push(dep)
  }
  notify() {
    // 通知所有的watcher执行更新
    this.dep.forEach(watcher => {
      watcher.update()
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    // $el挂载的就是需要处理的DOM
    this.$el = document.querySelector(el)
    // 将真实的DOM元素拷贝一份作为文档片段，之后进行分析
    const fragment = this.node2Fragment(this.$el)
    // 解析文档片段
    this.compileNode(fragment)
    // 将文档片段加入到真实的DOM中去
    this.$el.appendChild(fragment)
  }
  // https://developer.mozilla.org/zh-CN/search?q=querySelector
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node node对象
  node2Fragment(el) {
    // 创建空白文档片段
    const fragment = document.createDocumentFragment()
    let child
    //  appendChild会把原来的child给移动到新的文档中，当el.firstChild为空时，
    // while也会结束 a = undefined  => 返回 undefined
    while((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment
  }
  // 通过迭代循环来找出{{}}中的内容，v-xxx与@xxx的内容，并且单独处理
  compileNode(node) {
    const nodes = node.childNodes
    // 类数组的循环
    Array.from(nodes).forEach(node1 => {
      if (this.isElement(node1)) {
        this.compileElement(node1)
      } else if (this.isInterpolation(node1)) {
        this.compileText(node1)
      }
      node1.childNodes.length > 0 && this.compileNode(node1)
    });
  }
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node  Node.nodeType
  isElement(node) {
    return node.nodeType === 1;
  }
  // 校验是否是文本节点 并且是大括号中的内容
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    const reg = /\{\{(.*?)\}\}/g
    const string = node.textContent.match(reg)
    // 取出大括号中的内容，并且处理
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    // 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
    this.text(node, RegExp.$1)
  }
  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(arr => {
      if (arr.name.indexOf('v-') > -1) {
        this[`${arr.name.substring(2)}`](node, arr.value)
      }
      if (arr.name.indexOf('@') > -1) {
        // console.log(node, arr.value)
        this.eventHandle(node, arr.name.substring(1), arr.value)
      }
    })
  }
  // 因为是大括号里面的内容，所以沿用之前的逻辑，都加上watcher
  text(node, key) {
    new Watcher(this.$vm, key, () => {
      node.textContent = this.$vm[key]
    })
    // 第一次初始化界面， 不然如果不进行赋值操作，
    // 就不会触发watcher里面的回调函数
    node.textContent = this.$vm[key]
  }
  html(node, key) {
    new Watcher(this.$vm, key, () => {
      node.innerHTML = this.$vm[key]
    })
    node.innerHTML = this.$vm[key]

  }
  // 对@xxx事件的处理
  eventHandle(node, eventName, methodName) {
    node.addEventListener(eventName, () => {
      this.$vm.$methods[methodName].call(this.$vm)
    })
  }
  // v-modal的处理 不仅仅当赋值的时候回触发watcher，并且为input添加事件
  // input中的值去修改this.$data.$xxx的值，实现双向绑定
  modal(node, key) {
    console.log(node.value)
    new Watcher(this.$vm, key, () => {
      node.value = this.$vm[key]
    })
    node.value = this.$vm[key]
    node.addEventListener('input', (e) => {
      this.$vm[key] = e.target.value
    })
  }
}
