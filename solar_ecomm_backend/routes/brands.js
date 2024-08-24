var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_brand', upload.single('icon'), function(req, res, next){
    try {
        pool.query("insert into brands(brandname, icon) values(?,?)", [req.body.brandname, req.file.filename], function(error,result){
            if(error){
                return res.status(200).json({status:false,message:'Database Error Please Connect with Database Administrator...'})
            }
            else{
                return res.status(200).json({status:true,message:'Brand Submitted Successfully....'})
            }
        })
    } catch(e){
        return res.status(200).json({status:false,message:'Failed to Submit Brand....'})
    }
});

router.get('/display_all_brands', function(req,res,next){
    try{
        pool.query('SELECT * FROM solar_ecomm.brands', function(error, result){
            if(error){
                return res.status(200).json({data:[], status:false})
            }
            else{
                return res.status(200).json({data:result, status:true})
            }

        })
  
    } 
    catch(e){
        return res.status(200).json({data:[], status:false})
    }
})

router.post('/edit_data', function(req, res, next){
    try{
        pool.query("update solar_ecomm.brands set brandname=? where brandid=?", [req.body.brandname,req.body.brandid], function(error,result){
            if(error){
                console.log(error)
                return res.status(200).json({status:false,message:'Database Error....'})
            }
            else{
                return res.status(200).json({status:true,message:'Brand Editted Successfully....'})
            }
        })
    }
    catch(e){
        return res.status(200).json({status:false,message:'Failed to Update Brand....'})
    }
})

router.post('/edit_icon',upload.single('icon'), function(req, res, next){
    try{
        pool.query("update brands set icon=? where brandid=?", [req.file.filename, req.body.brandid], function(error,result){
            if(error){
                return res.status(200).json({status:false,message:'Database Error....'})
            }
            else{
                return res.status(200).json({status:true,message:'Brand Editted Successfully....'})
            }
        })
    }
    catch(e){
        return res.status(200).json({status:false,message:'Failed to Update Brand....'})
    }
})

router.post('/delete_data', function(req, res, next) {
    try{
     pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
      if(error){ 
        res.status(200).json({message:'Database Error Pls Connect with Database Admin...',status:false})
      }
      else{
        res.status(200).json({message:'Brand Deleted Successfully',status:true})
      }  
     })
    }
    catch(e){
        res.status(200).json({message:'Fail to Submit Brand',status:false})
    }
    });

module.exports = router;