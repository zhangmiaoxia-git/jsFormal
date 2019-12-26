const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    setTimeout(()=>{
        res.json({code:1});
    },3000);
});

module.exports = router;