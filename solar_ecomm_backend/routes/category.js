var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

router.post('/add_new_category', upload.single('icon'), function(req, res, next){
    try{
        pool.query('insert into category(brandid, categoryname, icon) values(?,?,?)', [req.body.brandid, req.body.categoryname, req.file.filename], function(error,result){
            if(error){
                console.log(error)
                return res.status(200).json({status:false,message:'Database Error....'})
            }
            else{
                return res.status(200).json({status:true,message:'Category Submitted Successfully....'})
            }
        })
    }
    catch(e){
        return res.status(200).json({status:false,message:'Failed to Submit Category'})
    }
})

router.get('/display_all_category', function(req, res, next){
    try{
        pool.query("SELECT C.*, (select B.brandname from brands B where B.brandid=C.brandid) as brandname FROM solar_ecomm.category C", function(error,result){
            if(error){
                return res.status(200).json({data:[], status:false })
            }
            else{
                return res.status(200).json({data:result, status:true})
            }
        })
    }
    catch(e){
        return res.status(200).json({data:[], status:false })
    }
})

router.post('/edit_category', function(req, res, next){
    try{
       pool.query("update solar_ecomm.category set brandid=?, categoryname=? where categoryid=?", [req.body.brandid, req.body.categoryname, req.body.categoryid], function(error, result){
        if(error){
            return res.status(200).json({ message:'Datatbase Error....', status:false})
        }
        else{
            return res.status(200).json({message:'Category Edited Successfully...', status:true})
        }
       }) 
    } 
    catch (e) {
        return res.status(200).json({message:'Failed to Submit Category....', status:false })
    }
})

router.post('/edit_icon', upload.single('icon'), function(req, res, next){
    try{
        pool.query("update solar_ecomm.category set icon=? where categoryid=?", [req.file.filename, req.body.categoryid], function(error, result){
            if(error){
                return res.status(200).json({message:'Database Error....', status:false})
            }
            else{
                return res.status(200).json({message:'Icon Edited Successfully....', status:true})
            }
        })
        
    } catch (e) {
        return res.status(200).json({message:'Failed to Edit Category Icon....', status:false})
    }
})

router.post('/delete_data', function(req, res, next){
    try{
        pool.query("delete from category where categoryid=?", [req.body.categoryid], function(error, result){
            if(error){
                return res.status(200).json({message:'Database Error....', status:false})
            }
            else{
                return res.status(200).json({message:'Category Deleted Succesfully....', status:true})
            }
        })
        
    } catch(e) {
        return res.status(200).json({message:'Failed to Delete Category....', status:false})
    }
})

router.post('/display_all_category_by_brands', function(req, res, next){
    try {
    pool.query("SELECT C.*, (select B.brandname from brands B where B.brandid=C.brandid) as brandname FROM solar_ecomm.category C where brandid=?",[req.body.brandid], function(error,result){
        if(error){
            res.status(200).json({message:'Database Error....', status:false})
        }
        else{
            res.status(200).json({data:result, status:true})
        }
    })    
    } 
    catch(e) {
        res.status(200).json({message:'Failed to Submit Category', status:false})
    }
})




module.exports = router;