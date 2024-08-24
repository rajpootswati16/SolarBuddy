import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function PlusMinusComponent(props){
    const [value,setValue]=useState(0)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

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
    <div style={{display:'flex',width:'60%',fontSize:'0.9vw',justifyContent:'space-between'}}>
        
        {matches?
        
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        {value===0?    
        
        <Button onClick={handlePlus} size="small" style={{color:'#000',fontSize:'0.9vw'}} variant="text" endIcon={<AddShoppingCartIcon style={{fontSize:'0.9vw'}} />}>
            Add
        </Button>:
        
        
        <ButtonGroup size="small" variant="text" aria-label="Small button group" style={{display:'flex',alignItems:'center',color:'#fff',background:'#000',paddingTop:'0.5vw',paddingBottom:'0.6vw',marginLeft:'2vw'}} >
            <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw',paddingLeft:'1vw',paddingRight:'1vw'}}>+</div>
            <div style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw'}}>{value}</div>
            <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'1vw',paddingLeft:'1vw',paddingRight:'1vw'}}>-</div>
        </ButtonGroup> 
        }
        </div> : 
        
        <div>
       {value===0?    
        
        <Button onClick={handlePlus} size="small" style={{color:'#000',fontSize:'0.9vw'}} variant="text" endIcon={<AddShoppingCartIcon style={{fontSize:'0.9vw'}} />}>
            Add
        </Button>:
        
        
        <ButtonGroup size="small" variant="text" aria-label="Small button group" sx={{display:'flex',alignItems:'center',marginRight:'0.8vw',color:'#fff',background:'#000',paddingTop:'0.27vw',paddingBottom:'0.34vw',marginLeft:'0.7vw'}} >
            <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'0.8vw',paddingLeft:'0.5vw',paddingRight:'0.5vw',marginLeft:'0.2vw',marginRight:'0.2vw'}}>+</div>
            <div style={{fontWeight:'bolder',cursor:'pointer',fontSize:'0.8vw'}}>{value}</div>
            <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'0.8vw',paddingLeft:'0.5vw',paddingRight:'0.5vw',marginLeft:'0.2vw',marginRight:'0.2vw'}}>-</div>
        </ButtonGroup> 
        }
        </div> }

        <div> {matches?<div></div> :
          <Button style={{color:'white',background:'black',fontSize:'0.7vw'}} onClick={handlePlus} size="small" variant='contained' >
            Buy
          </Button>    } 
        </div>
      
    </div>
    )

}