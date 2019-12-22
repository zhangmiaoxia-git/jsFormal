const fs = require('fs');

fs.writeFile('www/2.txt','567',function(error){
    if(error){
        console.log('失败');
    }
});