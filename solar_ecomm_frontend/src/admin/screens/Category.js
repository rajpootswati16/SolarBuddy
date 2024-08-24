import React, { useEffect, useState } from 'react'
import { usestyle } from '../css/CategoryCss'
import { Avatar, Button, Grid, TextField, FormControl,InputLabel,Select,MenuItem, FormHelperText } from '@mui/material'
import TitleComponent from '../components/TitleComponent'
import { getData, postData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import fake from "../css/fake.jpg"

export default function Category() {
    const classes=usestyle()
    const [brandId,setBrandId]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file: fake})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList,setBrandList]=useState([])

    ////////////////////////////// Fetch Brand Data into DropDown////////////////////////////////////// 

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
        setIcon({bytes:(event.target.files[0]),file:URL.createObjectURL(event.target.files[0])})
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
        if(categoryName.length===0){
            handleError('categoryname','Category is Required....')
            error=true
        }
        if(icon.bytes.length===0){
            handleError('icon','Please Select Icon....')
            error=true
        }

        if(error===false){
            var formData= new FormData()
            formData.append('brandid',brandId)
            formData.append('categoryname',categoryName)
            formData.append('icon',icon.bytes)
            var result= await postData(formData, 'category/add_new_category')

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
    }


  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title='Category Register' link="/admindashboard/displayallcategory"/>
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
                <TextField error={errorMessage.categoryname} helperText={errorMessage.categoryname} onFocus={()=>handleError('categoryname',null)} onChange={(event)=>setCategoryName(event.target.value)} variant='outlined' label='Category Name' fullWidth />
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
                <Avatar alt='category' src={icon.file} variant='rounded'/>
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
