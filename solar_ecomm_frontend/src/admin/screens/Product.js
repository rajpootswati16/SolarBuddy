import React, { useEffect, useState } from 'react'
import { useStyles } from '../css/ProductCss'
import { Grid, TextField, Button, Select,Avatar, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import { getData, postData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"

export default function Product() {
    const classes = useStyles()
    const [brandId,setBrandId]=useState('')
    const [categoryId, setCategoryId]=useState('')
    const [subCategoryId, setSubCategorydId]=useState('')
    const [productName, setProductName]=useState('')
    const [description, setDescription]=useState('')
    const [picture, setPicture]=useState({bytes:'', file:fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList, setBrandList]=useState([])
    const [categoryList, setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])

    ///////////////////////////////////////////// HANDLE DROP DOWN ///////////////////////////////////////////////////////////////////
    
    const fetchAllBrand=async()=>{
        var result=await getData('brands/display_all_brands')
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
                                 ///////////////////// FETCH CATEGORY ///////////////////////////////////// 
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
                                //////////////////////////////// FETCH SUBCATEGORY /////////////////////////////////////// 

    const handleChangeCategory=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const fetchAllSubCategory=async(cid)=>{
        var result=await postData({categoryid: cid}, 'subcategory/display_all_subcategory_by_category')
        setSubCategoryList(result.data)
    }                    

    const fillSubCategory=()=>{
        return subCategoryList?.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    const handleIconChange=(event)=>{
        setPicture({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    }

    const handleError=(label,message)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handleSubmit=async()=>{
        var error=false
        if(brandId.length===0){
            handleError('brandid','Brand is Required....')
            error=true
        }
        if(categoryId.length===0){
            handleError('categoryid','Category is Required....')
            error=true
        }
        if(subCategoryId.length===0){
            handleError('subcategoryid','Sub-Category is Required....')
            error=true
        }
        if(productName.length===0){
            handleError('productname','Product Name is Required....')
            error=true
        }
        if(description.length===0){
            handleError('description','Description is Required....')
            error=true
        }
        if(picture.bytes.length===0){
            handleError('picture','Picture is Required....')
            error=true
        }

        if(error===false){
            var formData=new FormData()
            formData.append('brandid',brandId)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('productname',productName)
            formData.append('description',description)
            formData.append('picture',picture.bytes)
            var result=await postData(formData, 'product/add_new_product')
            if(result.status){
                Swal.fire({
                  title: "Product Register",
                  text: result.message,
                  icon: "success"
                });
            }
            else{
                Swal.fire({
                  title: "Product Register",
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
                <TitleComponent title='Product Register' link="/admindashboard/displayallproduct" />
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brand"
                  onChange={handleChangeBrand}
                  error={errorMessage.brandid}
                  onFocus={()=>handleError('brandid',null)}
                >
                <MenuItem >Select Brand</MenuItem>
                {fillBrands()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.brandid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={categoryId} label="Category"
                  onChange={handleChangeCategory}
                  onFocus={()=>handleError('categoryid',null)}
                  error={errorMessage.categoryid}
                >
                <MenuItem >Select Category</MenuItem>
                {fillCategory()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.categoryid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={subCategoryId} label="Sub-Category"
                  onChange={(event)=>setSubCategorydId(event.target.value)}
                  error={errorMessage.subcategoryid}
                  onFocus={()=>handleError('subcategoryid',null)}
                >
                <MenuItem >Select SubCategory</MenuItem>
                {fillSubCategory()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.subcategoryid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField error={errorMessage.productname} helperText={errorMessage.productname} onFocus={()=>handleError('productname',null)} onChange={(event=>setProductName(event.target.value))} variant='outlined' label='Product Name' fullWidth />
            </Grid>

            <Grid item xs={12} className={classes.centerstyle}>
                <TextField error={errorMessage.description} helperText={errorMessage.description} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} variant='outlined' label='Description' fullWidth />
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
                <Avatar alt='product' src={picture.file} variant='rounded' />
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
