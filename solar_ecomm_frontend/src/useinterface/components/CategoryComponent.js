import React from 'react'
import { serverURL } from "../../services/FetchNodeServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';

export default function CategoryComponent(props) {
    var sldr=useRef()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
  };
  
  var items=props.data


    const showItems=()=>{
        return items.map((item)=>{
            return <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                <div style={{height:'90%', width:'90%',borderRadius:'60%', background:'#dfe4ea',display:'flex', justifyContent:'center',alignItems:'center'}}>
                <img alt='' src={`${serverURL}/images/${item.icon}`} style={{width:'100%',height:'100%'}}/>
                </div>

                <div style={{height:'90%',width:'90%',marginTop:'1vw',textAlign:'center',fontWeight:'bold',letterSpacing:0.5,fontSize:'1vw',fontFamily:'Poppins'}}>
                    {item.categoryname}
                </div>
            </div>
        })
    }

    const handleForward=()=>{
      sldr.current.slickNext()
    }

    const handleBackward=()=>{
      sldr.current.slickPrev()
    }

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{fontWeight:'600',marginBottom:'1vw',fontSize:'1.3vw',letterSpacing:'0.05vw',color:'#222f3e'}}>{props.title}</div>
        
        <div style={{width:'100%',position:'relative' }}>
        <ArrowBackIosNewIcon onClick={handleBackward} style={{cursor:'pointer', position:'absolute',top:'4.5vw',left:'-3vw',zIndex:'1vw',fontSize:'2.2vw',color:'#576574'}}/>
          <Slider ref={sldr} {...settings}>
            {showItems()}
          </Slider>
        <ArrowForwardIosIcon onClick={handleForward} style={{cursor:'pointer',position:'absolute',top:'4.5vw',right:'-3vw',zIndex:'1vw',fontSize:'2.2vw', color:'#576574'}}/>  
        </div>
      
      
    </div>
  )
}

