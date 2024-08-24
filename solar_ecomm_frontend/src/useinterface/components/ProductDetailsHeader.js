import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import SearchBarComponent from './SearchBarComponent';
import { Divider, Grid, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './DrawerComponent';
import { useStyles } from '../css/UserInterfaceCss';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';

export default function ProductDetailsHeader() {
    const classes=useStyles()
    const [activeIndex,setActiveIndex]=useState(0)
    const [open,setOpen]=useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const products=useSelector((state)=>state.cart)
    const keys=Object.keys(products)

    const handleOpenDrawer=()=>{
      setOpen(true)
    }


    var textItems=[{text:'FLAT 20% OFF ON YOUR 1ST PURCHASE'},{text:'GET 10% OFF ON 14999/-',code:'USE CODE:FLAT10'},{text:'FLAT 15% OFF ON SELECTED COLLECTION',code:'USE CODE:WOW15'}]


    const showText=()=>{
      return textItems?.map((item)=>{
        return <div style={{textAlign:'center',color:'white',fontSize:'0.8vw',letterSpacing:'0.1vw',fontWeight:"600"}}>
                    {item.text} <u>{item.code}</u>
                </div>        
      })
    }


    return (
        <div  style={{width:'100%'}}>
          <div style={{width:'100%',height:'40%',background:'black',paddingTop:'0.7vw',paddingBottom:'0.7vw'}}>
            <Carousel autoplay activeIndex={activeIndex}
              onChange={(newIndex) => setActiveIndex(newIndex)}
              indicators={false} swipe={true}>
              {showText()}
            </Carousel>
          </div>
          
          
        <div style={{width:'100%',height:'60%',background:'#f1f2f6',display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'1vw',paddingBottom:'1vw'}}>
        
          <Grid container spacing={3} >
          { matches?
          <Grid item xs={2} style={{display:'flex',width:'8%',marginLeft:'2vw'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
          <MenuIcon style={{fontSize:'1.6vw'}}/>
          </IconButton>
          
          <div style={{marginTop:'1vw',fontSize:'1.8vw',fontWeight:'bold'}}>
            SolarBuddy
          </div> 
          <DrawerComponent open={open} setOpen={setOpen}/>
        </Grid >:

        <Grid item xs={2} style={{display:'flex',width:'10%',marginLeft:'1.8vw'}}>
          <IconButton
            size="large"
            edge="start"  
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
            >
            <MenuIcon style={{fontSize:'1.6vw'}}/>
          </IconButton>

          <div className={classes.heading} style={{marginTop:'0.4vw',fontSize:'1.6vw'}}>
            SolarBuddy
          </div>
            <DrawerComponent open={open} setOpen={setOpen}/>
          </Grid >}


          {matches ?
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',width:'78%',marginTop:'3vw'}}>
                <PersonOutlineOutlinedIcon style={{fontSize:'2.1vw'}}/>
                <Badge badgeContent={keys.length} color="primary">
                <ShoppingBagOutlined style={{fontSize:'1.9vw',}}/>
                </Badge>
            </div > :
            
            <Grid item xs={7} style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
              <SearchBarComponent parentWidth='60%' width='89%' />
            </Grid >}

            {matches?
            <div></div>:
            <Grid item xs={2} style={{display:'flex',justifyContent:'end',marginTop:'0.5vw',marginLeft:'2vw'}}>
              <PersonOutlineOutlinedIcon style={{fontSize:'2.1vw'}}/>
              <Badge badgeContent={keys.length} color="primary">
              <ShoppingBagOutlined style={{fontSize:'1.9vw',}}/>
              </Badge>
            </Grid>}
             
          </Grid>
        </div >    
       
        <div style={{width:'100%'}}> <Divider /> </div>
            
        </div>
    );
}