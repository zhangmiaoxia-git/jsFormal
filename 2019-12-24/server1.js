//node_modules中的http是为了模块化开发
const http = require('http'),
jquery = require('jquery'),
fs = require('fs'),
urlModel = require('url'), //可以拿到url的具体信息
qs = require('querystring');

const app = http.createServer((request,response)=>{
    //设置跨域的域名端口
    let originAry = [
        'http://localhost:81'
    ];
    //判断请求的域名端口是否是设置的
    if(originAry.includes(request.headers.origin)){
        //设置跨域响应头
        response.writeHead(200,{
            'Content-Type':'text/html',
            'Access-Control-Allow-Origin':request.headers.origin,
        });
    }
    const {pathname,query} = urlModel.parse(request.url);
    //设置文件的后缀名
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    let re = new RegExp(lastName.join('|'));
    // console.log(pathname);
    if(pathname === '/'){  //根目录直接访问index.html
        let data = fs.readFileSync('www/index.html');
        response.end(data.toString());
    }else if(re.test(pathname)){  //如果不是根目录，就访问对应的文件
        // console.log(urlModel.parse(request.url));
        try{
            let data = fs.readFileSync('www'+pathname);
            response.end(data.toString());
        }catch(e){
            let data = fs.readFileSync('www/404.html');
            response.end(data.toString());
        }
    }else{   //访问接口
        switch(pathname){
            //新建文件夹名字
            case '/add':
                //获取文件名字
                const {mkdirname} = qs.parse(query);
                fs.mkdir('www/'+mkdirname+'/',(err)=>{
                    //如果填写的文件名重复了，需要判断
                    if(err){
                        if(err.code === 'EEXIST'){
                            fs.readdir('www',(error,filesAry)=>{
                                //返回的是一个数组，数组中存放的是当前文件下的所有文件名字
                                // console.log(filesAry);
                                let num = 0;
                                //判断填写的文件夹名字已经存在filesAry中
                                let b = filesAry.includes(mkdirname);
                                let name = '';
                                //如果填写的文件夹名字已经存在，继续判断是否还有重复的名字，如果没有，则新建文件
                                while(b){
                                    name = mkdirname.replace(/\(\d+\)/,'');
                                    //继续找重复的文件夹
                                    b = filesAry.includes(name + '('+ (++num) +')');
                                    name = name + '('+(num)+')'
                                }
                                //创建新的文件夹
                                fs.mkdir('www/'+name+'/',()=>{
                                    console.log('第二次创建成功');
                                    response.end(JSON.stringify({code:1,msg:'创建文件夹成功'}));
                                });
                            });
                        }
                        console.log('创建失败');
                        console.log(err);
                        return;
                    }
                    response.end(JSON.stringify({code:1,msg:'创建文件夹成功'}));
                });
            break;
            //重命名
            case '/rename':
                //请求方式是post方式
                if(/^post$/i.test(request.method)){
                    let temp = '';
                    //接收传输的参数
                    request.on('data',(data)=>{
                        temp+=data;
                    });
                    request.on('end',()=>{
                        //将字符串类型的转换为对象类型的
                        // console.log(qs.parse(temp.toString()));
                        let o = qs.parse(temp.toString());
                        //重命名
                        fs.rename('www/'+o.oldname,'www/'+o.newname,()=>{
                            response.end(JSON.stringify({code:1,msg:'rename success'}));
                        });
                    });
                }
            break;
            //jsonp
            case '/jsonp':
                //wd=123&callback=fn
                let o = qs.parse(query.toString());
                if(o.wd == 123){
                    let json = JSON.stringify({
                        code:1,
                        ary:[1,2,3,4,5],
                    });
                    response.end(o.callback+'('+json+')');
                }else{
                    let json2 = JSON.stringify({
                        code:1,
                        ary:[5,6,7,8],
                    });
                    response.end(o.callback+'('+json2+')');
                }


            break;
        }
    }

    // response.writeHead(200,{'Content-Type':'text/html'});
    // response.end(JSON.stringify({name:'小红'}));
});

//默认端口号
let port = 80;
app.listen(port);

//当服务器报错的时候触发报错事件
app.on('error',(e)=>{
    console.log(e);
    //端口被占用报错
    if(e.code === 'EADDRINUSE'){
        port++;
        console.log(port);
        app.listen(port);
    }
});