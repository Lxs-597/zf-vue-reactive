(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueComposition = {}));
}(this, (function (exports) { 'use strict';

  var isObject = function (val) { return typeof val === 'object' && val !== null; };
  var isSymbol = function (val) { return typeof val === 'symbol'; };

  function createGetter() {
      return function get(target, key, receiver) {
          var res = Reflect.get(target, key, receiver);
          if (isSymbol(key))
              return res;
          if (isObject(res))
              return reactive(res);
          return res;
      };
  }
  function createSetter() {
      return function set(target, key, value, receiver) {
          var result = Reflect.set(target, key, value, receiver);
          return result;
      };
  }
  var get = createGetter();
  var set = createSetter();
  var mutableHandlers = {
      get: get,
      set: set,
  };

  function reactive(target) {
      return createReactiveObject(target, mutableHandlers);
  }
  var proxyMap = new WeakMap();
  function createReactiveObject(target, baseHandlers) {
      if (!isObject(target))
          return target;
      var exisitingProxy = proxyMap.get(target);
      if (exisitingProxy)
          return exisitingProxy;
      var proxy = new Proxy(target, baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
  }

  function effect() {
  }

  function ref() {
  }

  function computed() {
  }

  exports.computed = computed;
  exports.effect = effect;
  exports.reactive = reactive;
  exports.ref = ref;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue.js.map
