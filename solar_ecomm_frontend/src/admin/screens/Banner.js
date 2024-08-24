import React, {useState, useEffect} from 'react'
import { Grid,TextField,Button,MenuItem,Select,InputLabel,FormControl,FormHelperText, Avatar} from '@mui/material'
import { usestyle } from '../css/BrandsCss'
import TitleComponent from '../components/TitleComponent'
import Swal from "sweetalert2"
import { getData, postData } from '../../services/FetchNodeServices'

export default function Banner() {
    const classes=usestyle()
    const [bannerName,setBannerName]=useState('')
    const [picture,setPicture]=useState({file:[]})
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [errorMessage,setErrorMessage]=useState([])


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
    //////////////////////////////////////////////////////////////////// 
    const handleError=(label,message)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handlePictureChange=(event)=>{
        if(Object.values(event.target.files).length<=4){
            Swal.fire({
                icon: "error",
                title: "Pls Upload 4 or more files",
                timer:1500,
                toast:true
            });
        }
        else{
            setPicture({file:Object.values(event.target.files)})
        }
    }

    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return(<div style={{margin:2}}><Avatar alt="pic" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
    }

    const handleSubmit=async()=>{
        var error=false

        if(brandId.length===0){
            handleError('brandid','Brand is required....')
            error=true
        }
        if(bannerName.length===0){
            handleError('bannername','Banner Name is required....')
            error=true
        }
        if(picture.file.length===0){
            handleError('picture','Please select pictures....')
            error=true
        }

        if(error===false){
            var formData=new FormData()
            formData.append('brandid',brandId)
            formData.append('bannername',bannerName)
            picture.file.map((item,i)=>{
                return formData.append('picture'+i,item)
            })

            var result=await postData(formData, 'banner/add_new_banner')

            if(result.status){
                Swal.fire({
                    title: "Banners",
                    text: result.message,
                    icon: "success"
                }); 
            }
            else{
                Swal.fire({
                    title: "Banners",
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
                    <TitleComponent title='Banners' />
                </Grid>

                <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={brandId} label="Brand"
                  onChange={(event)=>setBrandId(event.target.value)}  
                  onFocus={()=>handleError('brandid',null)}
                  error={errorMessage.brandid}
                >
                <MenuItem >Select Brand</MenuItem>
                {fillBrands()}
                </Select>
                <FormHelperText style={{color: '#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif"}}>{errorMessage.brandid}</FormHelperText>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField error={errorMessage.bannername} helperText={errorMessage.bannername} onFocus={()=>handleError('bannername',null)} onChange={(event)=>setBannerName(event.target.value)} variant='outlined' label='Banner Name' fullWidth />
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
