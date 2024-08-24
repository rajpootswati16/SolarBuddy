import { Grid } from '@mui/material'
import React, {useState} from 'react'
import { serverURL } from '../../services/FetchNodeServices'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';


export default function PopularBrands(props) {

    const [isHovered,setIsHovered]=useState(false)

    const handleFocus=()=>{
        setIsHovered(true)
    }
    const handleBlur=()=>{
        setIsHovered(false)
    }

    var brands=props.data

    const showBrands=()=>{
        return brands?.map((item)=>{
            return (<div style={{width:'20%',height:'40%',display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'row',background:'white',outline:'groove',outlineColor:'grey',outlineWidth:'1px'}}>
                        <img alt='' src={`${serverURL}/images/${item.icon}`} style={{width:'35%',height:'45%',flexWrap:"wrap",flexDirection:'row'}}/>
                    </div>
            )
        })
    }
  return (
    <div style={{display:'flex',width:'100%'}}>
        <Grid spacing={2} container style={{flexDirection:'row'}}>
            <Grid item xs={12} style={{display:'flex'}}>
            <div  style={{fontWeight:'600',fontSize:"1.6vw",flexGrow:1,marginBottom:'3%',color:'#222f3e'}}>
                Popular Brands
            </div>
            <div onMouseEnter={handleFocus} onMouseLeave={handleBlur} style={{display:'flex',justifyContent:'center', fontWeight:"bold",color:'#222f3e',fontSize:'1vw',marginTop:'1vw',cursor:'pointer'}}>
                View all
               <ArrowRightAltOutlinedIcon style={{marginLeft:'0.5vw',visibility: isHovered?"visible":'hidden',display:'flex',textAlign:'center',fontSize:'1.6vw'}}/>
               
            </div>
            </Grid>
            {showBrands()}

        </Grid>
    </div>
  )
}
