import { Grid } from '@mui/material'
import React from 'react'
import { serverURL } from '../../services/FetchNodeServices';

export default function ShippingComponent() {

    var shipitem=[{icon:'delivery.png',heading:'FREE SHIPPING',subheading:'Free Shipping Order INR 100'},
    {icon:'secure.png',heading:'SECURE PAYMENT',subheading:'We Value Your Security'},
    {icon:'online.png',heading:'ONLINE SUPPORT',subheading:'We Have Support 24/7'},
    {icon:'cash.png',heading:'PAYMENT ON DELIVERY',subheading:'Cash On Delivery Option'}]

    const showItems=()=>{
        return shipitem?.map((item)=>{
            return <Grid item xs={3} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'20%',marginTop:'0.8vw',marginBottom:'0.8vw'}}>
                    <img alt='delivery' src={`${serverURL}/images/${item.icon}`} style={{width:'80%',height:'45%'}} />
                </div>
                <div style={{flexDirection:'column'}}>
                <div style={{fontWeight:'bold', fontSize:'0.9vw'}}>
                    {item.heading}
                </div>
                <div style={{fontSize:'0.75vw'}}>
                    {item.subheading}
                </div>
                </div>
                
            </Grid>
        })
    }
  return (
    <div style={{width:'80%',display:'flex',alignItems:'center',justifyContent:'center'}} >
      <Grid container spacing={2}>
        {showItems()}
      </Grid>
    </div>
  )
}
