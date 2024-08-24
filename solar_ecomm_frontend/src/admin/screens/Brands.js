import React from 'react'
import { useState } from 'react'
import { Grid,TextField,Button,Avatar } from '@mui/material'
import { usestyle } from '../css/BrandsCss'
import TitleComponent from '../components/TitleComponent'
import { postData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"


export default function Brands() {
    const classes = usestyle()
    const [brandName,setBrandName]=useState('')
    const [icon,setIcon] = useState({bytes:'', file: fake})
    const [errorMessage,setErrorMessage]=useState({})

    const handleIconChange=(event)=>{
      setIcon({bytes:(event.target.files[0]), file:URL.createObjectURL(event.target.files[0])})
      // handleError('icon',null)
    }

    const handleError=(label,message)=>{
      setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    
    const handleSubmit = async () => {
      var error=false
      if(brandName.length===0){
        handleError('brandname','Brand Name is Required....')
        error=true
      }
      if(icon.bytes.length===0){
        handleError('icon','Please Select icon')
        error=true
      }
      
      if(error===false){
        var formData = new FormData();
        formData.append('brandname', brandName);
        formData.append('icon', icon.bytes);
        const result = await postData(formData, 'brands/add_new_brand');
        if(result.status){
          Swal.fire({
            title: "Brand Register",
            text: result.message,
            icon: "success"
          });
        }
        else{
          Swal.fire({
            title: "Brand Register",
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
          <TitleComponent title='Brand Register' link='/admindashboard/displayallbrands'/>
        </Grid>
        <Grid item xs={12}>
         <TextField error={errorMessage.brandname} helperText={errorMessage.brandname} onFocus={()=>handleError('brandname',null)} onChange={(event)=>setBrandName(event.target.value)} fullWidth label="Brand Name" variant="outlined" />
        </Grid>

        <Grid item xs={6} className={classes.centerstyle}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <Button variant="contained" component='label' >
              <input onChange={handleIconChange} type='file' accept='image/*' hidden multiple/>
              Upload
            </Button>
            <div className={classes.errorHeading}>{errorMessage.icon}</div>
          </div>
        </Grid>
        
        <Grid item xs={6} className={classes.centerstyle}>
          <Avatar alt='brand' src={icon.file} variant="rounded" />
        </Grid>

        <Grid item xs={6}>
          <Button onClick={handleSubmit} variant="contained" fullWidth >Submit</Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" fullWidth >Reset</Button>
        </Grid>
        
      </Grid>
      </div>
      
    </div>
  )
}


