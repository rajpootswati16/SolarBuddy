var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

router.post('/add_new_productdetail', upload.any(), function(req, res, next) {
    try {
        var files;
        files=req?.files?.map((item)=>{
            return item.filename
        })
       pool.query("insert into productdetails (brandid, categoryid, subcategoryid, productid, productsubname, description, weight, weighttype, packaging, qty, price, offerprice, offertype, picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.brandid, req.body.categoryid, req.body.subcategoryid, req.body.productid, req.body.productsubname, req.body.description, req.body.weight, req.body.weighttype, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype, files+''], function(error,result){
        if(error){
            console.log("Error",error)
            return res.status(200).json({message:'Database Error....',status:false})
        }
        else{
            console.log("Result",result)
            return res.status(200).json({message:'Productdetails Submitted Seccesfully',status:true})
        }
       }) 
    } 
    catch(e) {console.log("Exception",e)
        return res.status(200).json({message:'Failed to Submit Productdetails....',status:false})
    }
});

router.get('/display_all_productdetail', function(req, res, next){
    try{
      pool.query("select PD.*, (select P.productname from Product P where PD.productid=P.productid) as productname, (select S.subcategoryname from subcategory S where PD.subcategoryid=S.subcategoryid) as subcategoryname, (select C.categoryname from category C where PD.categoryid=C.categoryid) as categoryname, (select B.brandname from brands B where PD.brandid=B.brandid) as brandname from productdetails PD", function(error, result){
        if(error){
            return res.status(200).json({data:[], status:false})
        }
        else{
            return res.status(200).json({data:result, status:true})
        }
      })  
        
    } 
    catch(e) {
        return res.status(200).json({data:[], status:false})
    }
})

router.post('/edit_productdetail', function(req, res, next){
    try{
       pool.query("update productdetails set brandid=?,categoryid=?,subcategoryid=?,productid=?,productsubname=?,description=?,weight=?,weighttype=?,packaging=?,qty=?,price=?,offerprice=?,offertype=? where productdetailid=?",[req.body.brandid, req.body.categoryid, req.body.subcategoryid, req.body.productid, req.body.productsubname, req.body.description, req.body.weight, req.body.weighttype, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype, req.body.productdetailid], function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....',status:false})
        }
        else{
            return res.status(200).json({message:'Productdetails Edited Succesfully',status:true})
        }
       }) 
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Edit Productdetails....',status:false})
    }
})

router.post('/edit_picture', upload.any(), function(req, res, next){
    try{
        var files;
        files=req?.files?.map((item)=>{
            return item.filename
        })
       pool.query("update productdetails set picture=? where productdetailid=?",[files+'', req.body.productdetailid], function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....',status:false})
        }
        else{
            return res.status(200).json({message:'Productdetails Picture Edited Seccesfully',status:true})
        }
       }) 
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Edit Productdetails Picture....',status:false})
    }
})

router.post('/delete_data', function(req, res, next){
    try{
       pool.query("delete from productdetails where productdetailid=?",[req.body.productdetailid], function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....',status:false})
        }
        else{
            return res.status(200).json({message:'Productdetails Deleted Seccesfully',status:true})
        }
       }) 
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Delete Productdetails....',status:false})
    }
})
  
  module.exports = router;