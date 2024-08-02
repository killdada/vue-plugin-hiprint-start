/* eslint-disable */

import $ from "jquery";
import { toRaw } from "vue";

window.$ = window.jQuery = $;

// https://mp.weixin.qq.com/s/vfgSG62tAXn7Ot7y3x68fw 重写配置参数，field下拉选项支持disabled扩展

export default (function () {
  function t() {
    this.name = "field";
  }

  return (
    (t.prototype.createTarget = function (t) {
      var e = void 0;
      /** 是否有配置禁用的key，如果配置了，那么禁用掉 */
      const disabledOptions = toRaw(t?.options?.disabledOptions) || "";
      let disabled = "";
      if (disabledOptions && disabledOptions.length) {
        const keys = disabledOptions.split(",");
        if (keys.includes("field")) {
          disabled = "disabled";
        }
      }

      // 设计时的模板挂载到了对应的__template下面有且只有一个模板，这里从模板中获取字段（解决表格无法选择下拉字段的问题），运行时不需要（只需要打印功能即可）
      const fields = t.getFields() || window?.__template?.getFields();

      if ((t && (e = fields), e)) {
        this.isSelect = !0;

        var n = `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            字段名\n            </div>\n            <div class="hiprint-option-item-field">\n            <select ${disabled} class="auto-submit">\n                <option value="" >请选择字段</option>`;
        e.forEach(function (t, e) {
          n +=
            ' <option value="' +
            (t.field || "") +
            '" >' +
            (t.text || "") +
            "</option>";
        }),
          (n += " </select>\n            </div>\n        </div>"),
          (this.target = $(n));
      } else {
        this.isSelect = !1;
        this.target = $(
          `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            字段名\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" ${disabled} placeholder="请输入字段名" class="auto-submit">\n            </div>\n        </div>`
        );
      }

      return this.target;
    }),
    (t.prototype.getValue = function () {
      return (
        (this.isSelect
          ? this.target.find("select").val()
          : this.target.find("input").val()) || void 0
      );
    }),
    (t.prototype.setValue = function (t) {
      this.isSelect
        ? t &&
          (this.target.find('option[value="' + t + '"]').length ||
            this.target
              .find("select")
              .prepend('<option value="' + t + '" >' + t + "</option>"),
          this.target.find("select").val(t))
        : this.target.find("input").val(t);
    }),
    (t.prototype.destroy = function () {
      this.target.remove();
    }),
    t
  );
})();
