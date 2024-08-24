import React, {useState, useEffect} from 'react'
import MaterialTable from '@material-table/core'
import { usestyle } from '../css/CategoryCss'
import { getData, serverURL, postData } from '../../services/FetchNodeServices'
import { Dialog,DialogContent,DialogActions } from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import {Button, TextField, FormHelperText, Grid,Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"
import { useNavigate } from 'react-router-dom'

export default function DisplayAllCategory() {
    const classes=usestyle()
    const [CategoryList,setCategoryList]=useState([])
    const [status, setStatus]=useState(false)
    const [brandId, setBrandId]=useState('')
    const [categoryId, setCategoryId]=useState('')
    const [categoryName, setCategoryName]= useState('')
    const [icon, setIcon]= useState({bytes:'', file: fake})
    const [brandList, setBrandList]=useState([])
    const [errorMessage, setErrorMessage] = useState({})
    const [btnStatus,setBtnStatus]=useState(false)
    const [oldPicture, setOldPicture]=useState('')
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

    ////////////////////////////////////////// Edit/Delete Data //////////////////////////////////
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

    const handleIconChange=(event)=>{
      setIcon({bytes:event.target.files[0], file:URL.createObjectURL(event.target.files[0])})
      setBtnStatus(true)
    }

    const handleError=(label,message)=>{
      setErrorMessage((prev)=>({...prev, [label]:message}))
    }

    const handleEditData=async()=>{
      var error= false

      if(brandId.length===0){
        handleError('brandid', 'Brand is Required...')
        error=true
      }
      if(categoryName.length===0){
        handleError('categoryname','Category Name is required...')
        error=true
      }

      if(error===false){
        var body={brandid:brandId, categoryname:categoryName, categoryid:categoryId}
        var result=await postData(body, 'category/edit_category')

        if(result.status){
          Swal.fire({
            title: "Category Register",
            text: result.message,
            icon: "success"
          });
        }
        else{
          Swal.fire({
            title: "Category Register",
            text: result.message,
            icon: "error"
          });
        }
      }
      fetchAllCategory()
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
        formData.append('categoryid',categoryId)
        var result= await postData(formData, 'category/edit_icon')

        if (result.status) {
          Swal.fire({
            title: "Category Register",
            text: result.message,
            icon: "success"
          });
        } 
        else {
          Swal.fire({
            title: "Category Register",
            text: result.message,
            icon: "error"
          });
        }
      }
      fetchAllCategory()
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
          var result=await postData({categoryid:rowData.categoryid}, 'category/delete_data')
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
          fetchAllCategory()
        }
      });
    }

    const showCategoryForm=()=>{
      return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title='Category Register'/>
                </Grid>
    
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brand Name"
                       onChange={(event)=>setBrandId(event.target.value)}
                       onFocus={()=>handleError('brandid',null)}
                       error={errorMessage.brandid}
                    >
                    <MenuItem>-Select Brand-</MenuItem>    
                    {fillBrands()}
                    </Select>        
                    <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.brandid}</FormHelperText>        
                </FormControl>
                </Grid>
    
                <Grid item xs={12}>
                    <TextField error={errorMessage.categoryname} helperText={errorMessage.categoryname} onFocus={()=>handleError('categoryname',null)} onChange={(event)=>setCategoryName(event.target.value)} value={categoryName} variant='outlined' label='Category Name' fullWidth />
                </Grid>
    
                <Grid item xs={6} className={classes.centerstyle}>
                  {btnStatus?twoButtonComponent():
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component='label' >
                      <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
                        Upload
                    </Button>
                    <div className={classes.errorHeading}>{errorMessage.icon}</div>
                  </div>}
                </Grid>
    
                <Grid item xs={6} className={classes.centerstyle}>
                  <Avatar alt='category' src={icon.file} variant='rounded'/>
                </Grid>
    
            </Grid>
          </div>
        
      )
    } 



    ////////////////////////////////////////////// Display Dialog Box ///////////////////////////////////////////////
    const showDialog=()=>{
      return(
        <Dialog open={status} onClose={handleClose}>
          <DialogContent>
            {showCategoryForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData} >Edit Data</Button>
            <Button onClick={handleClose} >Close</Button>
          </DialogActions>
        </Dialog>
      )
    } 

    const handleClose=()=>{
      setStatus(false)
    }

    const handleDialog=(rowData)=>{
      setCategoryId(rowData.categoryid)
      setBrandId(rowData.brandid)
      setCategoryName(rowData.categoryname)
      setIcon({bytes:'', file:`${serverURL}/images/${rowData.icon}`})
      setOldPicture(`${serverURL}/images/${rowData.icon}`)
      setStatus(true)
    }

    /////////////////////////////////////////////// Show Category Data /////////////////////////////////////////////
    
    const fetchAllCategory=async()=>{
      var result=await getData('category/display_all_category')
      setCategoryList(result.data)
    }
    
    useEffect(function(){
      fetchAllCategory()
    },[])

    const showCategory=()=>{
      return (
        <MaterialTable
          title="Simple Action Preview"
          columns={[
            { title: 'Category Id', field: 'categoryid' },
            { title: 'Brand', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div> },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon', render:(rowData)=><div><img alt='icon' src={`${serverURL}/images/${rowData.icon}`} style={{width:35, height:35, borderRadius:5 }} /></div>},
          ]}
          data={CategoryList}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Category',
              onClick: (event, rowData) => handleDialog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete Brand',
              onClick: (event, rowData) => handleDeleteData(rowData)
            },
            {
              icon: 'add',
              isFreeAction:true,
              tooltip: 'New Category',
              onClick: (event, rowData) => navigate('/admindashboard/category')
            }
          ]}
        />
      )
    } 

  return (
    <div className={classes.root}>
      <div className={classes.brandlist_box}>
        {showCategory()}
        {showDialog()}
      </div>
    </div>
  )
}
