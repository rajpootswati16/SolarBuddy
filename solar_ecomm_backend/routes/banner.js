var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_banner', upload.any(), function(req, res, next){
    try {
        var files;
        files=req?.files?.map((item)=>{
            return item.filename
        })
        pool.query("insert into banner(brandid, bannername, picture) values(?,?,?) ", [req.body.brandid, req.body.bannername, files+''], function(error,result){
            if(error){
                return res.status(200).json({status:false,message:'Database Error...'})
            }
            else{
                return res.status(200).json({status:true,message:'Banners Submitted Successfully....'})
            }
        })
    } catch(e){
        return res.status(200).json({status:false,message:'Failed to Submit Banners....'})
    }
});

module.exports = router;