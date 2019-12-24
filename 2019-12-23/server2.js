const http = require('http'),
fs = require('fs'),
urlModel = require('url'),
qs = require('querystring');

const app = http.createServer((request,response)=>{
    //获取文件路径和参数
    const {pathname,query} = urlModel.parse(request.url);
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    let re = new RegExp(lastName.join('|'));
    if(pathname === '/'){
        let data = fs.readFileSync('www2/index.html');
        response.end(data.toString());
    }
});

let port = 80;
app.listen(port);

app.on('error',(e)=>{
    if(e.code === 'EADDRINUSE'){
        port++;
        app.listen(port);
    }
});