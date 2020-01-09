const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let ary = ['小花','小红'];

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    //设置跨域,*代表所有域名
    res.header('Access-Control-Allow-Origin', '*');
    //设置http允许请求的方式
    res.header('Access-Control-Allow-Methods','GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});

//token
//设置签名
const secret = 'ZF';

//登录接口
app.post('/login',(req,res)=>{
    const {username} = req.body;
    if(ary.includes(username)){
        res.json({
            code:0,
            msg:'登录成功',
            //登录成功之后创建token
            token:jwt.sign({user:username},secret,{
                expiresIn:20
            })
        });
    }else{
        res.json({
            code:1,
            msg:'失败'
        });
    }
});

//是否登录接口
//前端发送token一般不是通过body发送的，而是通过headers发送的，所以token是在headers头信息中
app.post('/islogin',(res,req)=>{
    //获取token值
    const token = req.headers.authorization;
    if(token){
        //解密token
        jwt.verify(token,secret,(error,data)=>{
            //如果有错误，说明，token无效
            if(error){
                res.json({
                    code:2,
                    msg:'失效'
                });
                return;
            }
            //token有效，可以访问
            res.json({
                code:0,
                msg:'有权限',
                //每次请求验证的时候，都重新生成一个新的token，保证令牌持久化
                token:jwt.sign({user:data.user},secret,{
                    expiresIn:20
                })
            });
        })
    }else{
        res.json({
            code:1,
            msg:'未登录'
        });
    }
});


app.listen(80);