import { useState, useEffect } from "react"
import MaterialTable from "@material-table/core"
import { useStyles } from "../css/SubCategoryCss"
import { getData, postData, serverURL } from "../../services/FetchNodeServices"
import { Button, TextField, MenuItem, Grid,FormControl,InputLabel,Select, FormHelperText, Avatar} from "@mui/material"
import {Dialog,DialogContent,DialogActions} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import fake from "../css/fake.jpg"
import { useNavigate } from 'react-router-dom'

export default function DisplayAllSubCategory() {
    const classes=useStyles()
    const [subCategoryList,setSubCategoryList]=useState([])
    const [status,setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'', file: fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [subCategoryId, setSubCategoryId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [btnStatus,setBtnStatus]=useState(false)
    const [oldPicture,setOldPicture]=useState('')
    const navigate=useNavigate()


    const twoButtonComponent=()=>{
      return(
        <div>
          <Button onClick={handleEditIcon}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      )
    }

    const handleCancel=()=>{
      setIcon({bytes:'',file:oldPicture})
      setBtnStatus(false)
    }

////////////////////////////////////////// Edit/Delete Data ///////////////////////////////////////////////////
  
// ////////////////////////////////////// Handle Drop Down /////////////////////////////////////////////
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

////////////////////////////////////////////////// /////////////////////////////////////////////////////////////

  const handleIconChange=(event)=>{
    setIcon({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})
    setBtnStatus(true)
  }

  const handleError=(label,message)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
  }

  const handleEditData=async()=>{
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
      handleError('brandid','Brand is required....')
      error=true
    }
    if(error===false){
      var body={brandid:brandId, categoryid:categoryId, subcategoryname:subCategoryName, subcategoryid:subCategoryId}
      var result =await postData(body, 'subcategory/edit_subcategory')
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
    fetchAllSubCategory()
  }

  const handleEditIcon=async()=>{
    var error=false

    if(icon.bytes.length===0){
      handleError('icon','Please insert icon...')
      error=true
    }

    if(error===false){
      var formData=new FormData()
      formData.append('icon',icon.bytes)
      formData.append('subcategoryid',subCategoryId)
      var result= await postData(formData, 'subcategory/edit_icon')

      if (result.status) {
        Swal.fire({
          title: "Sub-Category Register",
          text: result.message,
          icon: "success"
        });
      } 
      else {
        Swal.fire({
          title: "Sub-Category Register",
          text: result.message,
          icon: "error"
        });
      }
    }
    fetchAllSubCategory()
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
          var result=await postData({subcategoryid:rowData.subcategoryid}, 'subcategory/delete_data')
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
          fetchAllSubCategory()
        }
      });
    }

  const showSubCategoryform=()=>{
    return(
      <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TitleComponent title='Sub-Category Register' />
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
              <TextField error={errorMessage.subcategoryname} helperText={errorMessage.subcategoryname} onFocus={()=>handleError('subcategoryname',null)} onChange={(event)=>setSubCategoryName(event.target.value)} value={subCategoryName} variant='outlined' label='Sub-Category Name' fullWidth/>
            </Grid>

            <Grid item xs={6} className={classes.centerstyle}>
            {btnStatus?twoButtonComponent():
              <div style={{display:'flex', flexDirection:'column'}}>
                <Button variant='contained' component='label'>
                  <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
                  Upload
                </Button>
              <div className={classes.errorHeading}>{errorMessage.icon}</div>
              </div>}
            </Grid>

            <Grid item xs={6} className={classes.centerstyle}>
              <Avatar alt='subcategory' src={icon.file} variant='rounded'/>
            </Grid>

            </Grid>
      </div>
    )
  }


////////////////////////////////////////// Show Dialog /////////////////////////////////////////////////////////

    const showDialog=()=>{
        return(
          <Dialog open={status} onClose={handleClose}>
            <DialogContent>
              {showSubCategoryform()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditData}>Edit Data</Button>
              <Button onClick={handleClose} >Close</Button>
            </DialogActions>
          </Dialog>
        )
    } 

const handleDialog=(rowData)=>{
  fetchAllCategory(rowData.brandid)
  setSubCategoryId(rowData.subcategoryid)
  setBrandId(rowData.brandid)
  setCategoryId(rowData.categoryid)
  setSubCategoryName(rowData.subcategoryname)
  setIcon({bytes:'', file:`${serverURL}/images/${rowData.icon}`})
  setOldPicture(`${serverURL}/images/${rowData.icon}`)
  setStatus(true)
}

const handleClose=()=>{
    setStatus(false)
}

////////////////////////////////////////// Show Sub-Category Data ///////////////////////////////////////////// 

const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    setSubCategoryList(result.data)
}

useEffect(function(){
    fetchAllSubCategory()
},[])

const showSubCategory=()=>{
    return (
      <MaterialTable
        title="List of Sub-Category"
        columns={[
          { title: 'SubCategory Id', field: 'subcategoryid' },
          { title: 'Brand', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div> },
          { title: 'Category', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div>},
          { title: 'SubCategory Name', field: 'subcategoryname' },
          { title: 'Icon', render:(rowData)=><div><img alt='icon' src={`${serverURL}/images/${rowData.icon}`} style={{width:35, height:35, borderRadius:5 }} /></div>},
          
        ]}
        data={subCategoryList}        
        actions={[
            {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleDialog(rowData)
            },
          {
            icon: 'delete',
            tooltip: 'Delete Sub-Category',
            onClick: (event, rowData) => handleDeleteData(rowData)
          },
          {
            icon: 'add',
            isFreeAction:true,
            tooltip: 'Delete Sub-Category',
            onClick: (event, rowData) => navigate('/admindashboard/subcategory')
          }
        ]}
      />
    )
  }

  return (
    <div className={classes.root}>
        <div className={classes.subcategorylist_box}>
        {showSubCategory()}
        {showDialog()}
        </div>
    </div>
  )
}
