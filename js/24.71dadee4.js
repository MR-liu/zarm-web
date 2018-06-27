webpackJsonp([24],{133:function(n,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e(65),m=e.n(t),u=e(66),a=e.n(u),c=e(67),d=e.n(c),s=e(68),b=e.n(s),i=e(69),o=e.n(i),B=e(265),I=(e(425),function(n){function r(){return a()(this,r),b()(this,(r.__proto__||m()(r)).apply(this,arguments))}return o()(r,n),d()(r,[{key:"document",value:function(){return e(427)}}]),r}(B.a));r.default=I},425:function(n,r,e){"use strict";var t=e(426);e.n(t)},426:function(n,r){},427:function(n,r){n.exports="## Breadcrumb 面包屑\n\n告知用户当前页面在系统中的位置。\n\n### 基本用法\n\n面包屑的基本用法。\n\n::: demo 通过`Breadcrumb.Item`设置层级，如需跳转可添加`href`属性。\n```js\n  render() {\n    return (\n      <div>\n        <Breadcrumb>\n          <Breadcrumb.Item>首页</Breadcrumb.Item>\n          <Breadcrumb.Item>模块</Breadcrumb.Item>\n          <Breadcrumb.Item href=\"https://t.zhongan.com\">应用</Breadcrumb.Item>\n        </Breadcrumb>\n      </div>\n    );\n  }\n```\n:::\n\n### 自定义分隔符\n\n可以自定义面包屑分隔符。\n\n::: demo 可以通过`separator`属性设置分隔符。\n```js\n  render() {\n    return (\n      <div>\n        <Breadcrumb separator=\">\">\n          <Breadcrumb.Item>首页</Breadcrumb.Item>\n          <Breadcrumb.Item>模块</Breadcrumb.Item>\n          <Breadcrumb.Item href=\"https://t.zhongan.com\">应用</Breadcrumb.Item>\n        </Breadcrumb>\n      </div>\n    );\n  }\n```\n:::\n\n\n\n### Breadcrumb Attributes\n| 参数      | 说明          | 类型      | 可选值                           | 默认值  |\n|---------- |-------------- |---------- |--------------------------------  |-------- |\n| separator | 分隔符 | string | — | '/' |\n| className | 类名 | string | — | '' |\n\n\n### Breadcrumb.Item Attributes\n| 参数      | 说明          | 类型      | 可选值                           | 默认值  |\n|---------- |-------------- |---------- |--------------------------------  |-------- |\n| href | 跳转链接 | string | — | - |\n| className | 类名 | string | — | '' |\n"}});