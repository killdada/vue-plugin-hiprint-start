import { hiprint } from "vue-plugin-hiprint";
import field from "./field";
import disabledOptions from "./disabledOptions";

// 新增的一些自定义keys,也需要注入进去，getJson拿的只有注入过的参数
const config = {
  tabs: [
    {
      // 注入到第一个options，基础里面
      options: [
        {
          name: "disabledOptions", // 参数 key
          // after: "field", // 自定义参数，插入在 transform 之后
          // 自定义参数，禁用参数我们是禁用的，hidden为true，不需要再次修改
          hidden: true,
        },
      ],
    },
  ],
};

export function updateConfig() {
  hiprint.setConfig({
    // 加载 自定义/重写 的 参数,重写对应的字段名参数
    optionItems: [field],
  });
  hiprint.setConfig({
    // 加载 自定义/重写 的 参数,重写对应的字段名参数
    optionItems: [disabledOptions],
    /** 目前表格和文本扩展自定义参数disabledOptions */
    table: config,
    text: config,
  });
}
