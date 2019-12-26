const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

let sql = [
    {
        id:-1,
        name:'xh'
    },
    {
        id:0,
        name:'xd',
        type:0
    },
    {
        id:1,
        name:'xi',
        type:1
    },
    {
        id:2,
        name:'xm',
        type:9
    }
];

//设置session
app.use(session({
    secret:'1234',
    name:'session_id',
    cookie:{maxAge:5000},
    resave:false,
    saveUninitialized:true
}));

app.use(express.static('www'));

app.use('/',(req,res,next)=>{
    req.sql = sql;
    if(req.session.userinfo || req.url === '/login2'){
        next();
    }else{
        res.json({code:100});
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:false}));

//登录接口
app.use('/login',require('./router/user/login'));
//是否登录接口
app.use('/login2',require('./router/user/login2'));
app.use('/getary',require('./router/data/getary'));
app.use('/noloading',require('./router/data/noloading'));

app.listen(80);