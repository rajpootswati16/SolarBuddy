var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/display_all_category_by_brands', function(req, res, next){
    try {
    pool.query("SELECT C.*, (select B.brandname from brands B where B.brandid=C.brandid) as brandname FROM solar_ecomm.category C where C.brandid in(select B.brandid from brands B where B.brandname=?)",[req.body.brandname], function(error,result){
        if(error){console.log(error)
            res.status(200).json({message:'Database Error....', status:false, data:[]})
        }
        else{console.log('Result',result)
            res.status(200).json({data:result, status:true})
        }
    })    
    } 
    catch(e) {console.log('Exception',e)
        res.status(200).json({message:'Failed to Submit Category', status:false,data:[]})
    }
})

router.get('/fetch_all_brands', function(req,res,next){
    try{
        pool.query('SELECT * FROM solar_ecomm.brands WHERE brandname != "All"', function(error, result){
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

router.get('/fetch_all_banners', function(req, res, next){
    try {
        pool.query("select * from banner where brandid in(select brandid from brands where brandname='All')", function(error,result){
            if(error){
                console.log(error)
                res.status(200).json({message:'Database Error....', status:false, data:[]})
            }
            else{
                console.log('Result',result)
                res.status(200).json({data:result, status:true})
            }
        })
    } 
    catch(e){
        console.log('Exception',e)
        res.status(200).json({message:'Failed to Submit Category....', status:false, data:[]})
    }
})

router.post('/display_all_productdetail_by_offer', function(req, res, next){
    try{
        pool.query("select P.productname, P.picture as icon, PD.*, (select B.brandname from brands B where B.brandid=PD.brandid) as brandname, (select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=PD.subcategoryid)as subcategoryname from productdetails PD, product P where P.productid=PD.productid and PD.offertype=? ", [req.body.offertype], function(error,result){
            if(error){
                console.log('Error: ',error)
                return res.status(200).json({data:[], status:false})
            }
            else{
                console.log('Result: ',result)
                return res.status(200).json({data:result, status:true})
            }
        })
    }
    catch(e){
        console.log('Exception: ',e)
        return res.status(200).json({data:[], status:false})
    }
})






module.exports = router;