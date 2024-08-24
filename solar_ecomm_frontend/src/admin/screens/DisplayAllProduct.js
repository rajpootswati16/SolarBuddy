import React,{useState, useEffect} from 'react'
import { useStyles } from '../css/ProductCss'
import MaterialTable from '@material-table/core'
import TitleComponent from '../components/TitleComponent'
import Swal from 'sweetalert2'
import { getData, postData, serverURL } from '../../services/FetchNodeServices'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { Grid, TextField, Button, Select,Avatar, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import fake from "../css/fake.jpg"
import { useNavigate } from 'react-router-dom'

export default function DisplayAllProduct() {
    const classes = useStyles()
    const [productList, setProductList]=useState([])
    const [status, setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [categoryId, setCategoryId]=useState('')
    const [subCategoryId, setSubCategorydId]=useState('')
    const [productName,setProductName]=useState('')
    const [description,setDescription]=useState('')
    const [picture, setPicture]=useState({bytes:'', file: fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList,setBrandList]=useState([])
    const [categoryList, setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productId,setProductId]=useState('')
    const [oldPicture,setOldPicture]=useState('')
    const [btnStatus,setBtnStatus]=useState(false)
    const navigate =useNavigate()

    const twoButtonComponent=()=>{
        return(
            <div>
                <Button onClick={handleEditIcon}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
        )
    }

    const handleCancel=()=>{
        setPicture({bytes:'', file:oldPicture})
        setBtnStatus(false)
    }

  //////////////////////////////////////////////////////////////// EDIT/DELETE ////////////////////////////////////////////////////////////////////
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

  const fetchAllCategory=async(bid)=>{
    var result=await postData({brandid:bid},'category/display_all_category_by_brands')
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
  
  const handleIconChange=(event)=>{
    setPicture({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})
    setBtnStatus(true)
  }

  const handleError=(label,message)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
  }

  const handleEditData=async()=>{
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

    if(error===false){
        var body={brandid:brandId, categoryid:categoryId, subcategoryid:subCategoryId, productname:productName, description:description, productid:productId}
        var result= await postData(body, 'product/edit_product')
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
    fetchAllProducts()
  }

  const handleEditIcon=async()=>{
    var error=false

    if(picture.bytes.length===0){
        handleError('picture', 'Select Product Detail Icon....')
        error=true
    }

    if(error===false){
        var formData=new FormData()
        formData.append('picture', picture.bytes)
        formData.append('productid',productId)

        var result=await postData(formData,'product/edit_picture')
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
    fetchAllProducts()
  }

  const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(resultData) => {
      if (resultData.isConfirmed) {
        var result=await postData({productid:rowData.productid}, 'product/delete_data')
        if(result.status){
          Swal.fire({
            title: "Deleted!",
            text: result.message,
            icon: "success"
          }); 
        }         
        else{
          Swal.fire({
            title: "Sorry!",
            text: result.message,
            icon: "error"
          });
        }
        fetchAllProducts()
      }
    });
  }

  const showProductForm=()=>{
    return (
        <div >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title='Product Register' />
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
                    <TextField error={errorMessage.productname} helperText={errorMessage.productname} onFocus={()=>handleError('productname',null)} onChange={(event=>setProductName(event.target.value))} value={productName} variant='outlined' label='Product Name' fullWidth />
                </Grid>
    
                <Grid item xs={12} className={classes.centerstyle}>
                    <TextField error={errorMessage.description} helperText={errorMessage.description} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} value={description} variant='outlined' label='Description' fullWidth />
                </Grid>
    
                <Grid item xs={6} className={classes.centerstyle}>
                   { btnStatus?twoButtonComponent():
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Button variant='contained' component='label'>
                        <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
                        Upload
                    </Button>
                    <div className={classes.errorHeading}>{errorMessage.icon}</div>
                </div>}
                </Grid>
    
                <Grid item xs={6} className={classes.centerstyle}>
                <Avatar alt='product' src={picture.file} variant='rounded' />
                </Grid>

            </Grid>
        </div>    
      )
  }


  //////////////////////////////////////////////////////////////// SHOW DIALOG ///////////////////////////////////////////////////////////////////

  const showDialog=()=>{
    return(
        <Dialog open={status} onClose={handleClose} >
          <DialogContent>
            {showProductForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData} >Edit Data</Button>
            <Button onClick={handleClose} >Close</Button>
          </DialogActions>
        </Dialog>
      )
  }

  const handleDialog=(rowData)=>{
    fetchAllCategory(rowData.brandid)
    fetchAllSubCategory(rowData.categoryid)
    setProductId(rowData.productid)
    setBrandId(rowData.brandid)
    setCategoryId(rowData.categoryid)
    setSubCategorydId(rowData.subcategoryid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setPicture({bytes:'', file:`${serverURL}/images/${rowData.picture}`})
    setOldPicture(`${serverURL}/images/${rowData.picture}`)
    setStatus(true)
  }

  const handleClose=()=>{
    setStatus(false)
  }


///////////////////////////////////////////////////////////////// Fetch All Products ////////////////////////////////////////////////////////////
    
    const fetchAllProducts=async()=>{
        var result=await getData('product/display_all_product')
        setProductList(result.data)
    }

    useEffect(function(){
        fetchAllProducts()
    },[])

    const showProducts=()=> {
        return (
          <MaterialTable style={{fontSize:'0.7vw',width:'99%'}}
            title="List of Products"
            columns={[
              { title: 'Product Id', field: 'productid' },
              { title: 'Brand', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div> },
              { title: 'Category', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div> },
              { title: 'Category', render:(rowData)=><div>{rowData.subcategoryid}/{rowData.subcategoryname}</div> },
              { title: 'Product Name', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Picture', render:(rowData)=><div><img alt='product pic' src={`${serverURL}/images/${rowData.picture}`}  style={{width:35, height:35, borderRadius:5 }} /></div> },
            ]}
            data={productList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                isFreeAction:true,
                tooltip: 'Delete Sub-Category',
                onClick: (event, rowData) => navigate('/admindashboard/product')
              }
            ]}
          />
        )
      }

  return (
    <div className={classes.root}>
      <div className={classes.productlist_box}>
        {showProducts()}
        {showDialog()}
      </div>  
    </div>
  )
}
