import React, { useEffect, useState } from 'react'
import { useStyles } from '../css/ProductDetailsCss'
import { Grid,TextField,Button,MenuItem,Select,InputLabel,FormControl,FormHelperText, Avatar} from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import { postData,getData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails() {

    const classes =useStyles()
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId, setSubCategorydId]=useState('')
    const [productId, setProductId]=useState('')
    const [productSubName, setProductSubName]=useState('')
    const [description, setDescription]=useState('')
    const [weight, setWeight]=useState('')
    const [weightType, setWeightType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty, setQty]=useState('')
    const [price, setPrice]=useState('')
    const [offerPrice, setOfferPrice]=useState('')
    const [offerType, setOfferType]=useState('')
    const [picture,setPicture]=useState({file:[]})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList, setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList, setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])

    /////////////////////////////////////////////////// HANDLE DROP DOWN ///////////////////////////////////////////////////////////////////
    
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

    /////////////////////////////////////////////// CATEGORY BY BRANDS /////////////////////////////////////////////
    const fetchAllCategory = async (bid) => {
        var result = await postData({ brandid: bid },'category/display_all_category_by_brands' )
        setCategoryList(result.data)
    }

    const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllCategory(event.target.value)
    }

    const fillCategory=()=>{
        return categoryList?.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

                             //////////////////////////////////////////// FETCH SUB-CATEGORY//////////////////////////////////////

    const fetchAllSubCategory=async(cid)=>{
        var result=await postData({categoryid:cid}, 'subcategory/display_all_subcategory_by_category')
        setSubCategoryList(result.data)
    }

    const handleChangeCategory=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const fillSubCategory=()=>{
        return subCategoryList?.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

                                /////////////////////// FETCH PRODUCT ///////////////////////////////////
    
    const fetchAllProducts=async(sid)=>{
        var result=await postData({subcategoryid:sid}, 'product/display_all_product_by_subcategory')
        setProductList(result.data)
    }

    const handleChangeSubCategory=(event)=>{
        setSubCategorydId(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const fillProduct=()=>{
        return productList?.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    ///////////////////////////////// HANDLE MULTIPLE IMAGES ////////////////////////////////////////////////// 
    const handlePictureChange=(event)=>{
        if(Object.values(event.target.files).length<=3)
        { Swal.fire({
            icon: "error",
            title: "Pls Upload 3 or more files",
            timer:1500,
            toast:true
          });
        }
        else
        {
         
        setPicture({file:Object.values(event.target.files)})
        }
    }

    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return (<div style={{margin:2}}><Avatar alt="pic" src={URL.createObjectURL(item)} variant="rounded"  /></div>)
        })
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
        if(productId.length===0){
            handleError('productid','Product is Required....')
            error=true
        }
        if(productSubName.length===0){
            handleError('productsubname','Product Sub-Name is Required....')
            error=true
        }
        if(description.length===0){
            handleError('description','Description is Required....')
            error=true
        }
        if(weight.length===0){
            handleError('weight','Weight is Required....')
            error=true
        }
        if(weightType.length===0){
            handleError('weighttype','Weight-Type is Required....')
            error=true
        }
        if(packaging.length===0){
            handleError('packaging','Packaging is Required....')
            error=true
        }

        if(qty.length===0){
            handleError('qty','Quantity is Required....')
            error=true
        }
        if(price.length===0){
            handleError('price','Price is Required....')
            error=true
        }
        if(offerPrice.length===0){
            handleError('offerprice','Offer Price is Required....')
            error=true
        }
        if(offerType.length===0){
            handleError('offertype','Offer-Type is Required....')
            error=true
        }
        if(picture.file.length===0){
            handleError('picture','Please Select Picture....')
            error=true
        }

        if(error===false){
            var formData=new FormData()
            formData.append('brandid',brandId)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubName)
            formData.append('description',description)
            formData.append('weight',weight)
            formData.append('weighttype',weightType)
            formData.append('packaging',packaging)
            formData.append('qty',qty)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('offertype',offerType)
            picture.file.map((item,i)=>{
               return formData.append('picture'+i,item)
            })

            var result=await postData(formData,'productdetails//add_new_productdetail')

            if(result.status){
                Swal.fire({
                    title: "Product Details Register",
                    text: result.message,
                    icon: "success"
                  });
                }
                else{
                  Swal.fire({
                    title: "Product Details Register",
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
                <TitleComponent title='ProductDetail Register' link="/admindashboard/displayallproductdetails" />
            </Grid>

            <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brand"
                  onChange={handleChangeBrand}  
                  onFocus={()=>handleError('brandid',null)}
                  error={errorMessage.brandid}
                >
                <MenuItem >Select Brand</MenuItem>
                {fillBrands()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.brandid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={3}>
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

            <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={subCategoryId} label="Sub-Category"
                  onChange={handleChangeSubCategory}
                  onFocus={()=>handleError('subcategoryid',null)}
                  error={errorMessage.subcategoryid}
                >
                <MenuItem >Select SubCategory</MenuItem>
                {fillSubCategory()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.subcategoryid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={productId} label="Product"
                  onChange={(event)=>setProductId(event.target.value)}
                  onFocus={()=>handleError('product',null)}
                  error={errorMessage.productid}
                >
                <MenuItem >Select Product</MenuItem>
                {fillProduct()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.productid}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField error={errorMessage.productsubname} helperText={errorMessage.productsubname} onFocus={()=>handleError('productsubname',null)} onChange={(event)=>setProductSubName(event.target.value)} variant='outlined' label='Product Sub-Name' fullWidth />
            </Grid>

            <Grid item xs={12}>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                {/* <TextField error={errorMessage.description} helperText={errorMessage.description} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} variant='outlined' label='Description' fullWidth /> */}
            </Grid>

            <Grid item xs={3}>
                <TextField error={errorMessage.weight} helperText={errorMessage.weight} onFocus={()=>handleError('weight',null)} onChange={(event)=>setWeight(event.target.value)} variant='outlined' label='Weight' fullWidth />
            </Grid>

            <Grid item xs={3}>
                <TextField error={errorMessage.weighttype} helperText={errorMessage.weighttype} onFocus={()=>handleError('weighttype',null)} onChange={(event)=>setWeightType(event.target.value)} variant='outlined' label='Weight-Type' fullWidth />
            </Grid>

            <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Packaging</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={packaging} label="Packaging"
                  onChange={(event)=>setPackaging(event.target.value)}
                  onFocus={()=>handleError('packaging',null)}
                  error={errorMessage.packaging}
                >
                <MenuItem >Select Brand</MenuItem>
                <MenuItem value='Bottle' >Bottle</MenuItem>
                <MenuItem value='Box' >Box</MenuItem>
                <MenuItem value='Cartons' >Cartons</MenuItem>
                
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.packaging}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={3}>
                <TextField error={errorMessage.qty} helperText={errorMessage.qty} onFocus={()=>handleError('qty',null)} onChange={(event)=>setQty(event.target.value)} variant='outlined' label='Quantity' fullWidth />
            </Grid>

            <Grid item xs={4}>
                <TextField error={errorMessage.price} helperText={errorMessage.price} onFocus={()=>handleError('price',null)} onChange={(event)=>setPrice(event.target.value)} variant='outlined' label='Price' fullWidth />
            </Grid>

            <Grid item xs={4}>
                <TextField error={errorMessage.offerprice} helperText={errorMessage.offerprice} onFocus={()=>handleError('ofeerprice',null)} onChange={(event)=>setOfferPrice(event.target.value)} variant='outlined' label='Offer Price' fullWidth />
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Offer Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={offerType} label="Offer Type"
                  onChange={(event)=>setOfferType(event.target.value)}
                  onFocus={()=>handleError('offertype',null)}
                  error={errorMessage.offertype}
                >
                <MenuItem >Select Brand</MenuItem>
                <MenuItem value='Festival Offer' >Festival Offer</MenuItem>
                <MenuItem value='End Month Sale'>End Month Sale</MenuItem>
                <MenuItem value='End Month Sale'>Summer Sale</MenuItem>
                <MenuItem value='End Month Sale'>All</MenuItem>
                
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.offertype}</FormHelperText>
            </FormControl>
            </Grid>

            <Grid item xs={6} className={classes.centerstyle}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <Button variant='contained' component='label'>
                  <input onChange={handlePictureChange} type='file' accept='image/*' hidden multiple/>
                  Upload
                </Button>
              <div className={classes.errorHeading}>{errorMessage.picture}</div>
              </div>
            </Grid>

            <Grid item xs={6} className={classes.centerstyle}>
                {showImages()}
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
