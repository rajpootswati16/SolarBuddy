var express = require('express');
var router = express.Router();
var pool= require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/check_admin_password',  function(req, res, next){
    try { 
        // console.log(req.body)
        pool.query("select * from admindetails where (emailid=? or mobileno=?) && password=?", [req.body.emailid,req.body.emailid, req.body.password], function(error,result){
            if(error){
                // console.log(error)
                    res.status(200).json({status:false,message:'Database Error Please Connect with Database Administrator...'})
            }
            else{
                // console.log("Query result:", result);
                if(result.length==1){
                    res.status(200).json({status:true,data:result[0],message:'Login Successful....'})
                }
                
                else{
                    res.status(200).json({status:false, data:[], message:"Login Unsuccessful"})
                }
            }
        })
    } catch(e){
        // console.log("exception:", e)
            res.status(200).json({status:false,message:'Failed to Login....'})
    }
});

module.exports = router;