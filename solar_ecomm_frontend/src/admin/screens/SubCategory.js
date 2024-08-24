import React, { useEffect, useState } from 'react'
import { useStyles } from '../css/SubCategoryCss'
import { Grid, TextField,Avatar, FormControl,InputLabel,Select,MenuItem, Button, FormHelperText } from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import { postData,getData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"

export default function SubCategory() {
    const classes=useStyles()
    const [brandId, setBrandId]=useState('')
    const [categoryId, setCategoryId]=useState('')
    const [subCategoryName, setSubCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file: fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])

    const fetchAllBrand=async()=>{
        var result =await getData('brands/display_all_brands')
        setBrandList(result.data)
    }

    useEffect(function(){
        fetchAllBrand()
    },[])

    const fillBrands=()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }
//////////////////////////////////////// Fill Category by Choosing Brand ///////////////////////////////////////////////// 

    const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllCategory(event.target.value)
    }

    const fetchAllCategory = async (bid) => {
        var result = await postData({ brandid: bid },'category/display_all_category_by_brands' )
            setCategoryList(result.data)
    }

    const fillCategory=()=>{
        return categoryList?.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
//////////////////////////////////////////////////////////////////////////////////// 
    const handleIconChange=(event)=>{
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    }

    const handleError=(label,message)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handleSubmit=async()=>{
        var error=false
        if(brandId.length===0){
            handleError('brandid','Brand is required....')
            error=true
        }
        if(categoryId.length===0){
            handleError('categoryid','Category is required....')
            error=true
        }
        if(subCategoryName.length===0){
            handleError('subcategoryname','Sub-category name is required....')
            error=true
        }
        if(icon.bytes.length===0){
            handleError('icon','Please select icon....')
            error=true
        }

        if(error===false){
            var formData=new FormData()
            formData.append('brandid',brandId)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategoryName)
            formData.append('icon',icon.bytes)
            var result= await postData(formData,'subcategory/add_new_subcategory')
            if(result.status){
                Swal.fire({
                    title: "Sub-Category Register",
                    text: result.message,
                    icon: "success"
                  });
                }
                else{
                  Swal.fire({
                    title: "Sub-Category Register",
                    text: result.message,
                    icon: "error"
                  });  
            }
        }
    }

  return (
    <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title='Sub-Category Register' link="/admindashboard/displayallsubcategory" />
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brand"
                    onChange={handleChangeBrand}
                    error={errorMessage.brandid}
                    onFocus={()=>handleError('brandid',null)} >
                      <MenuItem>Select Brand</MenuItem>
                      {fillBrands()}
                    </Select>
                    <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.brandid}</FormHelperText>
                </FormControl>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={categoryId} label="Category"
                    error={errorMessage.categoryid}
                    onChange={(event)=>setCategoryId(event.target.value)}
                    onFocus={()=>handleError('categoryid',null)} >
                      <MenuItem>Select Category</MenuItem>
                      {fillCategory()}
                    </Select>
                    <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.categoryid}</FormHelperText>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField error={errorMessage.subcategoryname} helperText={errorMessage.subcategoryname} onFocus={()=>handleError('subcategoryname',null)} onChange={(event)=>setSubCategoryName(event.target.value)} variant='outlined' label='Sub-Category Name' fullWidth/>
                </Grid>

                <Grid item xs={6} className={classes.centerstyle}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <Button variant='contained' component='label'>
                            <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
                            Upload
                        </Button>
                        <div className={classes.errorHeading}>{errorMessage.icon}</div>
                    </div>
                </Grid>

                <Grid item xs={6} className={classes.centerstyle}>
                    <Avatar alt='subcategory' src={icon.file} variant='rounded'/>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant='contained' fullWidth>Submit</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant='contained' fullWidth>Reset</Button>
                </Grid>

                
            </Grid>
        </div>
      
    </div>
  )
}
