import React, { useState } from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import CartProductsComponent from '../components/CartProductsComponent';


export default function Cart(){
  return(
    <div >
      <ProductDetailsHeader />
      <div style={{display:'flex',justifyContent:'center',width:'100vw',height:'100vh',background:'#ced6e0'}}>

        <div style={{width:'80%',marginTop:'3.5vw',borderRadius:'1vw', }}>
          <CartProductsComponent />
        </div>

      </div>
    </div>
  )
}