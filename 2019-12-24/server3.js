const http = require('http'),
fs = require('fs'),
urlModel = require('url'),
qs = require('querystring');

let sql = [
    {
        'id':1,
        'name':'小花',
        'age':36,
        'checked':false
    }
];

app = http.createServer((request,response)=>{
    let originAry = [
        'http://localhost:81'
    ];
    if(originAry.includes(request.headers.origin)){
        response.writeHead(200,{
            'Content-Type':'text/html;charset=utf-8',
            'Access-Control-Allow-Origin':request.headers.origin
        });
    }

    const {pathname,query} = urlModel.parse(request.url);
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    let re = new RegExp(lastName);

    if(pathname == '/'){
        let data = fs.readFileSync('www/index.html');
        response.end(data.toString());
    }else if(re.test(pathname)){
        try{
            let data = fs.readFileSync('www'+pathname);
            response.end(data.toString());
        }catch(e){
            let data = fs.writeFileSync('www/4040.html');
            response.end(data.toString());
        }
    }else{
        response.setHeader('Content-Type','text/html;charset=utf-8');
        switch(pathname){
            case '/up':
                //获取传输的id
                let {id} = qs.parse(query);
                let upmsg = {
                    code:1,
                    msg:'上移成功'
                }
                //判断传输的id是否存在sql中，如果id是第一个的id，就给出提示，如果不是，就调换位置
                if(sql[0].id == id){
                    upmsg.code = 0;
                    upmsg.msg = '已经到头了';
                }else{
                    let index = sql.findIndex(item=>item.id==id);
                    let c = sql[index];
                    sql[index] = sql[index-1];
                    sql[index-1] = c;
                    upmsg.data = sql;
                }
                response.end(JSON.stringify(upmsg));
                break;
            //获取数据
            case '/getdata':
                response.end(JSON.stringify({code:1,ary:sql}));
                break;
            case '/add':
                let addobj = {
                    code:1,
                    msg:'添加成功',
                    response:sql
                }
                let obj = qs.parse(query);

                //判断传输的参数是否是undefined
                if(obj.name === 'undefined' || obj.age === 'undefined'){
                    addobj.code = 2;
                    addobj.msg = '参数错误';
                    response.statusCode = 400;
                }else{
                    let user = sql.find(item=>item.name === obj.name);
                    //判断用户名是否存在，如果不存在就添加用户信息，否则就给出提示
                    if(!user){
                        sql.push({
                            'id':Date.now(),
                            'name':obj.name,
                            'age':obj.age,
                            'checked':false,
                        });
                    }else{
                        addobj.code = 0;
                        addobj.msg = '此人已存在';
                    }
                }
                response.setHeader('Content-Type','text/html;charset=utf-8');
                response.end(JSON.stringify(addobj));
                break;
        }
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