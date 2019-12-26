const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/',(req,res)=>{
    let files = req.files;
    // console.log(file);
    files.forEach(file=>{
        let oldpath = path.resolve(file.path);
        let newpath = path.resolve(file.destination,file.originalname);
        //替换文件名
        fs.renameSync(oldpath,newpath);
    });

    res.json({code:1,msg:'成功'});
});

module.exports = router;