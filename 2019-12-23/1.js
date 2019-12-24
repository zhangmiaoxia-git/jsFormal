//文件的绝对路径，包含文件本身
console.log(__filename);
//文件的根目录，不包含文件本身
console.log(__dirname);
let path = require('path');
console.log(path);
console.log(path.join('wwwroot','./api.js'));
//自动找到当前文件所在的文件夹进行拼接，最后返回的是一个绝对路径，等于__filename
console.log(path.resolve(__dirname,'./1.js'));