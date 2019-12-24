const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//中间件
app.use(express.static('./www'));
//解析url信息
app.use(bodyParser.urlencoded({extended:false}));
//设置session信息
app.use(session({
    //签名
    secret:'12期',
    //标识
    name:'session_id',
    //设置超时时间
    cookie:{maxAge:10000},
    //即使session没有被修改，也保存session值
    resave:true,
    //强制未初始化的session保存到数据库
    saveUninitialized:true,
    //刷新cookie重置时间
    rolling:true
}))

let sql = [
    {
        id:0,
        user:'xiaohua',
        pw:'123'
    }
];

//失焦判断用户名是否存在
const userFn = (request,response)=>{
    console.log(request.body);
    const {body} = request;
    //正则匹配用户名
    let re = /^[a-zA-Z]\w{5,11}$/;
    let msgObj = {};
    //判断如果用户名符合规则才可以注册
    if(body.user && re.test(body.user)){
        let o = sql.find(item=>item.user === body.user);
        if(o){
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '可以注册';
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名';
    }
    response.json(msgObj)
}

app.post('/getname',userFn);

//注册接口
app.post('/register',(request,response)=>{
    const {body:{user,pw}} = request;
    let msgObj = {};

    if(user && pw){
        let o = sql.find(item=>item.user === user);
        if(o){
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '注册成功';
            //如果条件都符合，就把添加的用户信息push到sql中
            sql.push({
                id:Date.now(),
                user,
                pw
            });
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名或密码';
    }
    response.json(msgObj);
});

//登录
app.post('/login',(request,response)=>{
    let msgObj = {};
    const {body:{user,pw}} = request;

    if(user && pw){
        let o = sql.find(item=>item.user === user);
        if(o){
            //密码一致，则登录成功
            if(o.pw === pw){
                msgObj.code = 0;
                msgObj.msg = '登录成功';
                //将用户名存入session中
                request.session.userinfo = user;
            }else{
                msgObj.code = 3;
                msgObj.msg = '用户名或密码错误';
            }
        }else{
            msgObj.code = 1;
            msgObj.msg = '此用户没有注册';
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请核对用户信息';
    }
    response.json(msgObj);
});

//是否登录接口
app.get('/islogin',(request,response)=>{
    //判断用户名是否存在session中，如果存在，则说明用户已经登录，不需要重复登录了
    if(request.session.userinfo){
        response.json({
            code:0,
            msg:'欢迎回来',
            user:request.session.userinfo
        });
    }else{
        response.json({
            code:1,
            msg:'请登录',
        });
    }
});

//退出登录接口
app.get('/logout',(request,response)=>{
    //删除request中的session中存的用户名
    request.session.destroy(function(err){
        console.log(err);
    });
    response.send({
        code:0,
    });
})

//axios多并发接口
app.get('/a',(request,response)=>{
    setTimeout(()=>{
        response.json({user:'123'});
    },2000);
});

app.get('/b',(request,response)=>{
    setTimeout(()=>{
        response.json({iphone:'1234567'});
    },5000);
});

app.get('/c',(request,response)=>{
    let {user,iphone} = request.query;
    if(user == '123' && iphone == 'abc'){
        response.json({
            code:0
        });
    }else{
        response.json({
            code:1
        });
    }
});




let port = 80;
app.listen(port);
app.use('*',(request,response)=>{
    let data = fs.readFileSync('www/404.html');
    response.end(data.toString());
});