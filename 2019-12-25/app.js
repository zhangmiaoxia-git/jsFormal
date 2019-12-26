const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

//访问的文件夹
app.use(express.static('www'));
//解决axios不能用对象的问题
app.use(bodyParser.json());
//解析url信息
app.use(bodyParser.urlencoded({extended:false}));

//登录接口
app.post('/login',(req,res)=>{
    console.log(req);
    setTimeout(()=>{
        res.json({code:0});
    },1000);
});

//是否登录接口
app.post('/login2',(req,res)=>{
    const {body} = req;
    let o = sql.find(item=>item.name === body.name);
    let obj = null;
    if(o){
        obj = {
            code:0,
            type:o.type,
            user:o.name
        }
    }else{
        obj = {
            code:1
        }
    }
    res.json(obj);
});

app.get('/getary',(req,res)=>{
    setTimeout(()=>{
        res.json({code:0,ary:[1,2,3,4]});
    },4000);
});

app.get('/noloading',(req,res)=>{
    setTimeout(()=>{
        res.json({code:1});
    },3000);
});


app.listen(80);