import React, {useState, useEffect} from 'react'
import MaterialTable from '@material-table/core'
import { usestyle } from '../css/BrandsCss'
import { getData, serverURL, postData } from '../../services/FetchNodeServices'
import { Dialog,DialogContent,DialogActions, Grid } from '@mui/material'
import {Button, TextField, Avatar} from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"
import { useNavigate } from 'react-router-dom'


export default function DisplayAllBrands() {
    const classes = usestyle()
    const [brandList,setBrandList]=useState([])
    const [status,setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [brandName,setBrandName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file: fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [btnStatus,setBtnStatus]=useState(false)
    const [oldPicture,setOldPicture]=useState('')
    const navigate = useNavigate()

    const twoButtonComponent=()=>{
      return(
        <div>
          <Button onClick={handleEditIcon}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      )
    }

    const handleCancel=()=>{
      setIcon({bytes:'', file:oldPicture})
      setBtnStatus(false)
    }

///////////////////////////// EDIT/DELETE BRAND /////////////////////////////////////

    const handleIconChange=(event)=>{
      setIcon({bytes:(event.target.files[0]), file:URL.createObjectURL(event.target.files[0])})
      setBtnStatus(true)
      // handleError('icon',null)
    }

    const handleError=(label,message)=>{
      setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handleEditData = async () => {
      let error = false;
    
      if (brandName.length === 0) {
        handleError('brandname', 'Brand Name is Required....');
        error = true;
      }
    
      if (error===false) {
        var body = { brandid: brandId, brandname: brandName };
        var result = await postData(body, 'brands/edit_data');
    
        if (result.status) {
          Swal.fire({
            title: "Brand Register",
            text: result.message,
            icon: "success"
          });
        } 
        else {
          Swal.fire({
            title: "Brand Register",
            text: result.message,
            icon: "error"
          });
        }
      }
      fetchAllBrands()
    };  

  const handleEditIcon = async () => {
    let error = false;
  
    if (icon.bytes.length === 0) {
      handleError('icon', 'Please Select Icon...');
      error = true;
    }
  
    if (!error) {
      const formData = new FormData();
      formData.append('icon', icon.bytes);
      formData.append('brandid', brandId);
      const result = await postData(formData, 'brands/edit_icon');
  
      if (result.status) {
        Swal.fire({
          title: "Brand Register",
          text: result.message,
          icon: "success"
        });
      } 
      else {
        Swal.fire({
          title: "Brand Register",
          text: result.message,
          icon: "error"
        });
      }
    }
    fetchAllBrands()
  };

  const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Are you sure to delete this brand?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(resultData) => {
      if (resultData.isConfirmed) {
        var result=await postData({brandid:rowData.brandid}, 'brands/delete_data')
        if(result && result.status)
        Swal.fire({
          title: "Deleted!",
          text: result.message,
          icon: "success",
        });
        else
        Swal.fire({
          title: "Sorry!",
          text: result.message,
          icon: "error",
        });
      fetchAllBrands()
      
      }
    });
    
    }

    const showBrandForm=()=>{
      return(
          <div>
             <Grid container spacing={2}>
              <Grid item xs={12}>
                <TitleComponent title='Edit Brand' />
              </Grid>
              <Grid item xs={12}>
                <TextField value={brandName} error={errorMessage.brandName} helperText={errorMessage.brandName} onFocus={()=>handleError('brandname',null)} onChange={(event)=>setBrandName(event.target.value)} fullWidth label="Brand Name" variant="outlined"/>
              </Grid>
              
              <Grid item xs={6} className={classes.centerstyle}>
                {btnStatus?twoButtonComponent():
                <div style={{display:'flex',flexDirection:'column'}}>
                  <Button variant="contained" component='label' >
                    <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
                    Upload
                  </Button>
                  <div className={classes.errorHeading}>{errorMessage.icon}</div>
                </div>
                }
              </Grid>
              
              <Grid item xs={6} className={classes.centerstyle}>
                <Avatar alt='brand' src={icon.file} variant="rounded" />
              </Grid>
              
             </Grid>
          </div>
      )
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//////////////////////////////////////////////////// OPEN DIALOG ///////////////////////////////////////////

    const showDialog=()=>{
      return(
        <Dialog open={status} onClose={handleClose}>
          <DialogContent>
            {showBrandForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit Data</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )
    }

    const handleClose=()=>{
      setStatus(false)
    }

    const handleDialog=(rowData)=>{
      setBrandId(rowData.brandid)
      setBrandName(rowData.brandname)
      setIcon({bytes:'',file:`${serverURL}/images/${rowData.icon}`})
      setOldPicture(`${serverURL}/images/${rowData.icon}`)
      setStatus(true)
    }

////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Display Data ////////////////////////////////////////// 
    const fetchAllBrands=async()=>{
      var result=await getData('brands/display_all_brands')
       setBrandList(result.data)
    }

    
    useEffect(function(){
      fetchAllBrands()
    },[])


    function showBrands() {
      return (
        <MaterialTable
          title="List of Brands"
          columns={[
            { title: 'Brand Id', field: 'brandid' },
            { title: 'Brand Name', field: 'brandname' },
            { title: 'Icon', render:(rowData)=><div><img alt='icon' src={`${serverURL}/images/${rowData.icon}`} style={{width:35, height:40, borderRadius:5}} /></div> },
            
          ]}
          data={brandList}      
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Brand',
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
              tooltip: 'New Brand',
              onClick: (event, rowData) => navigate('/admindashboard/brands')
            }
          ]}
        />
      )
    }

  return (
    <div className={classes.root}>
      <div className={classes.brandlist_box}>
        {showBrands()}
        {showDialog()}
      </div> 
    </div>
  )
}
