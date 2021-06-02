/*
  @Author: lize
  @Date: 2021/6/1
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/1
*/
let Vue; // 声明一个变量用来存储install内接收的vue实例 给 constructor 内调用
class MyVueRouter {
  private $options: any;
  static install: (_vue) => void;
  private current: string;
  private matched: any[];
  constructor(options) {
    // 用于通过全局 this.$options.router.$options 获取
    this.$options = options; // eslint-disable-line
    const initPath = window.location.hash.slice(1);
    Vue.util.defineReactive(this, 'current', initPath); // this.current 记录的当前的URL标识符
  }
  onHashChange() {
    this.current = window.location.hash.slice(1) || '/';
    this.matched = [];
    this.match();
  }
  match(routes?) {
    routes = routes || this.$options.routes; // eslint-disable-line
    // 递归遍历记录当前URL下所有命中的route
    for (const route of routes) { // eslint-disable-line
      if (route.path === '/' && this.current === '/') { // 首页
        this.matched.push(route);
        return;
      }
      // about/info
      if (route.path !== '/' && this.current.indexOf(route.path)) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
  }
}
MyVueRouter.install = (_vue) => {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      // 将根组件上的 router 实例挂载到 Vue 原型，那么所有的组件实例上都会有 $router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  const Link = Vue.extend({
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h('a', {
        attrs: {
          href: `#${this.to}`,
        },
        }, [this.$slots.default]); // eslint-disable-line
    },
  });
  const View = Vue.extend({
    render(h) {
      this.$vnode.data.routerView = true; // 标记当前组件是 router-view
      let depth = 0;
      // 递归确认 当前 router-view 在组件树中的深度
      let parent = this.$parent;
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data;
        if (vnodeData) {
          if (vnodeData.routerView) { // 说明是一个 router-view
            ++depth; // eslint-disable-line
          }
        }
        parent = parent.$parent;
      }
      let component = null;
      const { matched } = this.$router;
      if (matched[depth]) {
        component = matched[depth].component;
      }
      console.log('当前深度：', depth);
      console.log('当前matched：', this.$router.matched);
      return h(component);
    },
  });
  Vue.component('router-link', Link);
  Vue.component('router-view', View);
};
export default MyVueRouter;
