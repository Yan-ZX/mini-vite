
//使用 esbuild 将其打包成一个文件 -> 只返回一个文件，浏览器就可以理解
//引入非js文件 ts -> 服务器 -> 把 ts 变成浏览器可以理解的代码(js) -> 给到浏览器

import { createApp } from "vue"

console.log(createApp)

console.log("main.js");