import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Fab } from "@mui/material";




export default function PlusMinusComponent(props){
    const [value,setValue]=useState(0)

    const handlePlus=()=>{
        var v=value
        v=v+1
        setValue(v)
        props.onChange(v)
    }

    const handleMinus=()=>{
        var v=value
        if(v>=1){ 
            v=v-1
            setValue(v)
            props.onChange(v)
        }
        
    }
    
    return(
    <div style={{display:'flex', flexDirection:'', justifyContent:'space-evenly'}}>
        
        {value===0? 
            <Fab onClick={handlePlus} style={{fontSize:'0.9vw',color:'#000',padding:'1vw',}}  variant="extended" size="small" >
                Add to Cart
                <AddShoppingCartIcon style={{fontSize:'1.2vw',paddingLeft:'0.5vw'}} />
            </Fab>:

            <Fab size="small" variant="extended" style={{display:'flex',alignItems:'center',color:'#fff',background:'#000',paddingTop:'0.5vw',paddingBottom:'0.6vw',marginLeft:'2vw'}} >
                <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw',paddingLeft:'1vw',paddingRight:'1vw'}}>+</div>
                <div style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw'}}>{value}</div>
                <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw',paddingLeft:'1vw',paddingRight:'1vw'}}>-</div>
            </Fab> }


            <Fab style={{color:'white',background:'black',fontSize:'0.9vw',marginLeft:'1.5vw',paddingRight:'2vw',paddingLeft:'2vw'}} variant="extended" size="small">
                Buy
            </Fab>
            
    </div>
    )

}