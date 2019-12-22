const http = require('http');
const fs = require('fs');

http.createServer(function(request,response){
    // fs.readFile('1.txt',function(err,data){
    //     // console.log(data);
    //     if(err){
    //         response.write('404');
    //         response.end();
    //     }
    //     // console.log(data.toString());
    //     response.write(data.toString());
    //     response.end();
    // });

    try{
        let url = request.url;
        //判断如果是根目录的话，就默认访问index.html
        if(url === '/'){
            url = '/index.html';
        }
        //如果是某个文件夹下的文件，要加上路径
        let data = fs.readFileSync('www/'+url);
        response.write(data.toString());
        response.end();
    }catch(error){
        let data = fs.readFileSync('www/404.html');
        response.write(data.toString());
        response.end();
    }
}).listen(80);