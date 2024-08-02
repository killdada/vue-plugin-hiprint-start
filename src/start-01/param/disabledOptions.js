/* eslint-disable */

import $ from "jquery";

window.$ = window.jQuery = $;

export default (function () {
  function t() {
    // json模板 options 对应键值 key
    this.name = "disabledOptions";
  }
  // 涉及修改元素样式， 添加一个 css 方法
  // t: 元素对象， e 参数值
  return (
    // 创建 DOM
    (t.prototype.createTarget = function (t, i, e) {
      //  t: 元素对象，i: 元素options, e: 元素printElementType
      return (
        (this.target = $(
          '<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        自定义禁用配置\n        </div>\n        <div class="hiprint-option-item-field">\n        <input disabled class="auto-submit"/>\n        </div>\n    </div>'
        )),
        this.target
      );
    }),
    // 获取值
    (t.prototype.getValue = function () {
      var t = this.target.find("input").val();
      if (t) return parseFloat(t.toString());
    }),
    // 设置值
    (t.prototype.setValue = function (t) {
      //  t: options 对应键的值
      this.target.find("input").val(t);
    }),
    // 销毁 DOM
    (t.prototype.destroy = function () {
      this.target.remove();
    }),
    t
  );
})();
