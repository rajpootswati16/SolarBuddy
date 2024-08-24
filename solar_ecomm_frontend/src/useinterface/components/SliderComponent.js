import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";

export default function SliderComponent(props) {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  var images=props.images

  const showImages=()=>{
    return images?.map((item)=>{
      return <img alt="" src={`${serverURL}/images/${item}`} style={{width:'80%', height:'10%'}} />
    })
  }

  return (
    <div style={{width:'100%'}}>
      <Slider {...settings}>
        {showImages()}
      </Slider>
    </div>
  )
}
