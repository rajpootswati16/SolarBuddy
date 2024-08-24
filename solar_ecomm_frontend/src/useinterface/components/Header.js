import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchBarComponent from './SearchBarComponent';
import { useStyles } from '../css/UserInterfaceCss';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComponent from './DrawerComponent';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';


export default function Header() {
    const classes=useStyles()
    const [open,setOpen]=useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const products=useSelector((state)=>state.cart)
    const keys=Object.keys(products)

    const handleOpenDrawer=()=>{
      setOpen(true)
    }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' style={{background:'#2d2d2d', color:'#fff'}} >
        <Toolbar>
         {matches? <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>:<div></div>}
          <div className={classes.heading}>
            SolarBuddy
          </div>
          <div className={classes.main_searchbar_div}>
           {matches?<div></div>: <SearchBarComponent parentWidth='50%' width='89%'/>}
          </div>
          <div className={classes.iconstyle}>
            {!matches?<PersonOutlineOutlinedIcon style={{fontSize:'2.1vw'}}/>:<div></div>}
            <Badge badgeContent={keys.length} color="primary">
            <ShoppingBagOutlined style={{fontSize:'1.9vw'}}/>
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    
    {matches?<Box>
        <AppBar position="static" style={{background:'#666'}}>
            <Toolbar>
            <div style={{width:'99%',display:'flex', alignItems:'center',justifyContent:'center'}}>
                <SearchBarComponent parentWidth='80%' width='100%'/>
            </div>    
            </Toolbar>
        </AppBar>
    </Box>:<div></div>}

    <DrawerComponent open={open} setOpen={setOpen}/>
    </div>
  )
}
