const express = require('express');
const app = express();
//post方式需配合body-parser使用，获取传输的参数
const bp = require('body-parser');
const fs = require('fs');

//解析url
app.use(bp.urlencoded({extended:false}));
let u = express.static('www');
app.use(u);

// app.get('/login',(request,response)=>{
//     if(request.query.user === 'xxx'){
//         response.send({
//             code:1,
//             msg:'哈哈'
//         });
//     }
// });

app.post('/register',(request,response)=>{
    console.log(request.body);
});

app.listen(80);