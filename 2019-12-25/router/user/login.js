const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req);
    setTimeout(()=>{
        res.json({code:0});
    },1000);
});

module.exports = router;