const http = require('http');
// console.log(http);

let app = http.createServer(function(request,response){
    // console.log('1234567');
    // console.log(request);
    // console.log(/user=(\d)/.exec(request.url.split('?')[1])[1]);
    let num = /user=(\d)/.exec(request.url.split('?')[1])[1];
    if(num === '1'){
        response.write('{"name":"123"}');
    }else if(num === '0'){
        response.write('{"name":"abc"}');
    }
    response.end();
});
app.listen(80);