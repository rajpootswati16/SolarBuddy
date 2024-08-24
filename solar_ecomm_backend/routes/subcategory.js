var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

router.post('/add_new_subcategory', upload.single('icon'), function(req, res, next) {
    try{
        pool.query("insert into subcategory(brandid, categoryid, subcategoryname, icon) values(?,?,?,?)", [req.body.brandid,req.body.categoryid,req.body.subcategoryname,req.file.filename], function(error,result){
            if(error){
                return res.status(200).json({message:'Database Error....', status:false})
            }
            else{
                return res.status(200).json({message:'Subcategory Submitted Succesfully....', status:true})
            }
        })
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Submit Subcategory....', status:false})
    }
});

router.get('/display_all_subcategory', function(req, res, next){
    try {
        pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname,(select B.brandname from brands B where B.brandid=S.brandid) as brandname from subcategory S", function(error, result){
            if(error){
                res.status(200).json({data:[], status:false})
            }
            else{
                res.status(200).json({data:result, status:true})
            }
        })    
    } 
    catch(e) {
        res.status(200).json({data:[], status:false})
    }
})

router.post('/edit_subcategory', function(req, res, next){
    try{
        pool.query("UPDATE subcategory SET brandid=?, categoryid=?, subcategoryname=? WHERE subcategoryid=?", [req.body.brandid, req.body.categoryid, req.body.subcategoryname, req.body.subcategoryid], function(error,result){
            if(error){
                return res.status(200).json({message:'Database Error....', status:false})
            }
            else{
                return res.status(200).json({message:'Sub-Category Updated Successfully...', status:true})
            }
        })
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to update Sub-Category....', status:false})
    }
})

router.post('/edit_icon', upload.single('icon'), function(req, res, next){
    try{
        pool.query("UPDATE subcategory SET icon=? WHERE subcategoryid=?",[req.file.filename,req.body.subcategoryid], function(error,result){
            if(error){
                return res.status(200).json({message:'Database Error....', status:false})
            }
            else{
                return res.status(200).json({message:'Sub-Category Icon Updated Succesfully...', status:true})
            }
        })
        
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to update Sub-Category Icon....', status:false})
    }
})

router.post('/delete_data', function(req, res, next){
    try {
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid], function(error, result){
            if(error){
                return res.status(200).json({message:'Database error....', status:false})
            }
            else{
                return res.status(200).json({message:'Sub-Category Deleted Succssfully....', status:true})
            }
        })    
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Delete Sub-Category....', status:false})
    }
})

router.post('/display_all_subcategory_by_category', function(req, res, next){
    try {
       pool.query("select S.*, (select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname, (select B.brandname from brands B where B.brandid=S.brandid) as brandname from subcategory S where categoryid=?", [req.body.categoryid],  function(error, result){
        if(error){
            return res.status(200).json({message:'Database Error....', status:false})
        }
        else{
            return res.status(200).json({data:result, status:true})
        }
       }) 
    } 
    catch(e) {
        return res.status(200).json({message:'Failed to Submit Subcategory...', status:false})
    }
})


  
  module.exports = router;
  