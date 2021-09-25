const Koa = require("koa");
const fs = require("fs");
const path = require("path");



const app = new Koa();

app.use((ctx) => {
  const url = ctx.request.url;
  //console.log(url)
  if (url == "/") {
    //加载html
    ctx.body = fs.readFileSync("./index.html", "utf-8")
    
  } else if (url.endsWith(".js")) {
    //找到对应的路径 加载 给到浏览器
    
    const p = path.resolve(__dirname, url.slice(1))
    //console.log(p)
    ctx.type = "text/javascript"
    //做标识  如果是 import * from "vue" -> node_modules
    const source = fs.readFileSync(p, "utf-8")
    ctx.body = rewriteImport(source)
    
  } else if (url.startsWith("/@modules/")) {
    //去 node_modules 里面查找
    const moduleName = url.replace("/@modules/", "");
   // const prefix = path.resolve(__dirname, "node_modules", moduleName)
    //package.json
    const prefix = __dirname + "/node_modules/" + moduleName;
    //console.log("prefix", prefix)
    
    const module = require(prefix + "/package.json").module;
    //console.log("module", module)
    const filePath = path.join(prefix, module);

    const ret = fs.readFileSync(filePath, "utf8");
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(ret);
    
  }
})

function rewriteImport(source) {
  return source
    .replace(/(from\s+["|'])(?![\.\/])/g, "$1/@modules/")
    .replace(/process\.env\.NODE_ENV/g, '"development"')
}

app.listen(8080, (ctx) => {

  

  console.log("open server localhost:8080");
});
