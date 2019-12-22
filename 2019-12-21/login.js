const http = require('http');
const fs = require('fs');

let sql = [
    {
        id:0,
        username:'小花',
        password:123,
    },
    {
        id:1,
        username:'小红',
        password:321,
    },
    {
        id:2,
        username:'小小',
        password:'456',
    },
    {
        id:3,
        username:'tony',
        password:789,
    }
];
function queryString(str){
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1] = $2;
    });
    return obj;
}

http.createServer((req,res)=>{
    let url = req.url;
    if(url !== '/favicon.ico'){
        if(url.includes('?')){
            let ary = url.split('?');
            let jk = ary[0];
            let opt = queryString(ary[1]);
            
            switch(jk){
                //验证用户名接口
                case '/getname':
                    let msg1 = {
                        code:0,
                        msg:'可以注册'
                    }
                    let o1 = sql.find(item=>item.username === decodeURI(opt.user));
                    if(o1){
                        msg1.code = 1;
                        msg1.msg = '有这个人了';
                    }
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg1));
                    res.end();
                    break;
                //注册接口
                case '/register':
                    let msg = {
                        code:1,
                        msg:'注册成功'
                    }
                    //判断sql中是否已存在页面中填写的用户名，如果已存在了，就不能重复注册了
                    let o = sql.find(item=>item.username === decodeURI(opt.user));
                    if(o){
                        msg.code = 0;
                        msg.msg = '有这个人了';
                    }else{
                        //如果在没有填写的用户，有密码的情况下，把填写的数据push到sql中
                        if(opt.password){
                            sql.push({
                                id:Date.now(),
                                username:decodeURI(opt.user),
                                password:opt.password,
                            });
                        }else{
                            //密码必须要填，如果不填写密码，则给出错误提示
                            msg.code = 2,
                            msg.msg = '参数不正确';
                            //设置状态码
                            res.writeHead(400,{'content-type':'text/html;charset=utf-8'});
                            res.write(JSON.stringify(msg));
                            res.end();
                            return;
                        }
                    }
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg));
                    res.end();
                break;
            }
        }else{
            try{
                if(url === '/'){
                    url = '/index.html';
                }
                let data = fs.readFileSync('www'+url);
                res.write(data.toString());
                res.end();
            }catch(error){
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(80);