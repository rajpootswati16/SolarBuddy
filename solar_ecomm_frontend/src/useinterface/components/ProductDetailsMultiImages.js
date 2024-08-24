import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { serverURL } from '../../services/FetchNodeServices'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ProductDetailsMultiImages(props) {
  
  const [imageIndex,setImageIndex]=useState(0)
  //console.log(props.data)
  var productImage=props.data.picture.split(",")

  var sldr=useRef()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:false,
    vertical:true,
    verticalSwiping:true
  };
  
  

  const handleImageChange=(index)=>{
    setImageIndex(index)
  }

  const handleForward=()=>{
    sldr.current.slickNext()
  }

  const handleBackward=()=>{
    sldr.current.slickPrev()
  }

  const showImages=()=>{
    return productImage.map((item, index)=>{
      return <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center',width:'100%'}}>
        <Grid item xs={12} key={index} onClick={()=>{handleImageChange(index)}} style={{cursor:'pointer'}} >
          <img alt='' src={`${serverURL}/images/${item}`}  style={{width:'80%',height:'60%', margin:'0.6vw',borderRadius:'0.2vw',border: index === imageIndex ? '2px solid blue' : 'none',}} />
        </Grid>

        </div>
    })
  }


  return (
    <div style={{width:'80%',display:'flex',flexDirection:'row'}}>
      <div style={{width:'10%',padding:'1vw',marginTop:'9vw'}}>
        <Grid container spacing={2}>
          <div style={{width:'100%',position:'relative'}}>
            <KeyboardArrowUpIcon onClick={handleBackward} style={{cursor:'pointer', position:'absolute',top:'-4vw',zIndex:'1vw',left:'2vw',fontSize:'2.2vw',color:'#576574'}}/>
              <Slider ref={sldr} {...settings}>
                {showImages()}
              </Slider>  
            <KeyboardArrowDownIcon onClick={handleForward} style={{cursor:'pointer',position:'absolute',bottom:'-4vw',right:'1.5vw',zIndex:'1vw',fontSize:'2.2vw', color:'#576574'}}/>  

          </div>
        </Grid>
      </div>
      
      <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
        {imageIndex !== null && (
          <img alt='' src={`${serverURL}/images/${productImage[imageIndex]}`} style={{width:"60%",height:"73%",marginTop:'7.5vw',paddingBottom:'4vw',marginLeft:'2vw'}}/>
        )}
         
      </div>  


      
    </div>
    
  )
}
