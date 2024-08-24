var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

router.post('/add_new_product', upload.single('picture'), function(req, res, next){
    try {
        pool.query("insert into product(brandid, categoryid, subcategoryid, productname, description, picture) values(?,?,?,?,?,?)", [req.body.brandid, req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.description, req.file.filename], function(error,result){
            if(error){
                console.error("Database error:", error);
                return res.status(500).json({message:'Database error', status:false});
            }
            else{
                return res.status(200).json({message:'Product Submitted Successfully', status:true});
            }
        }) 
    } 
    catch(e) {
        console.error("Exception:", e);
        return res.status(500).json({message:'Failed to Submit Product', status:false});
    }
})

router.get('/display_all_product', function(req, res, next){
    try {
        pool.query("select P.*,(select S.subcategoryname from subcategory S where P.subcategoryid=S.subcategoryid) as subcategoryname, (select C.categoryname from category C where P.categoryid=C.categoryid) as categoryname, (select B.brandname from brands B where P.brandid=B.brandid) as brandname from product P ", function(error,result){
            if(error){
                return res.status(200).json({status:false, data:[]})
            }
            else{
                return res.status(200).json({status:true, data:result})
            }
        })    
    } 
    catch(e) {
        return res.status(200).json({status:false, data:[]})
    }
})

router.post('/edit_product', function(req, res, next){
    try{
      pool.query("UPDATE product SET brandid=?, categoryid=?, subcategoryid=?, productname=?, description=? WHERE productid=?",[req.body.brandid,req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.description,req.body.productid], function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....', status:false})
        }
        else{
            return res.status(200).json({message:'Product Updated Successfully...', status:true})
        }
      })  
    
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Update Product....', status:false})
    }
})

router.post('/edit_picture',upload.single('picture'), function(req, res, next){
    try{
      pool.query("update product set picture=? where productid=?",[req.file.filename,req.body.productid], function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....', status:false})
        }
        else{
            return res.status(200).json({message:'Product Icon Updated Successfully...', status:true})
        }
      })  
    
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Update Product Icon....', status:false})
    }
})

router.post('/delete_data', function(req, res, next){
    try{
        pool.query("delete from product where productid=?",[req.body.productid], function(error, result){
          if(error){
              return res.status(200).json({message:'Database Error....', status:false})
          }
          else{
              return res.status(200).json({message:'Product Deleted Successfully...', status:true})
          }
        })  
      
      } 
      catch(e) {
          return res.status(200).json({message:'Failed to Delete Product....', status:false})
      }
})

router.post('/display_all_product_by_subcategory', function(req, res, next){
    try {
        pool.query("select P.*,(select S.subcategoryname from subcategory S where P.subcategoryid=S.subcategoryid) as subcategoryname, (select C.categoryname from category C where P.categoryid=C.categoryid) as categoryname, (select B.brandname from brands B where P.brandid=B.brandid) as brandname from product P where subcategoryid=?",[req.body.subcategoryid], function(error,result){
            if(error){
                return res.status(200).json({status:false, data:[]})
            }
            else{
                return res.status(200).json({status:true, data:result})
            }
        })    
    } 
    catch(e) {
        return res.status(200).json({status:false, data:[]})
    }
})
  
module.exports = router;