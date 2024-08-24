import React from 'react'
import { useStyles } from '../css/AdminDashboardCss'
import { AppBar, Box, Grid, Toolbar, Typography, Paper, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard } from '@mui/icons-material'
import BoltIcon from '@mui/icons-material/Bolt';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../services/FetchNodeServices';
import { Routes, Route } from 'react-router-dom';
import Brands from "./Brands";
import DisplayAllBrands from "./DisplayAllBrands";
import Category from "./Category"
import DisplayAllCategory from "./DisplayAllCategory";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Product from "./Product";
import DisplayAllProduct from "./DisplayAllProduct";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProductDetails";
import Banner from './Banner';
import DisplayAdminDashboard from './DisplayAdminDashboard';

export default function AdminDashboard(props) {

  const classes =useStyles()
  const navigate = useNavigate()
  var admin = JSON.parse(localStorage.getItem('ADMIN'))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
           SolarBuddy 
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Grid container spaces={3} style={{ paddingInlineStart: 5 }}>
        <Grid item xs={2.2}>
          <Paper>
          <div className={classes.leftBarStyle}>
              <img alt=''
                src={`${serverURL}/images/${admin?.picture}`}
                style={{ width: 70, height: 70, borderRadius: 35 }}
              />
              <div className={classes.nameStyle}>{admin?.adminname}</div>
              <div className={classes.emailStyle}>{admin?.emailid}</div>
              <div className={classes.phoneStyle}>+91{admin?.mobileno}</div>
            </div>
            <div className={classes.menuStyle}>
              <List>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate("/admindashboard/displayadmindashboard")}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className={classes.menuItemStyle}>Dashboard</span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                   onClick={()=>navigate('/admindashboard/displayallbrands')}   
                  >
                    <ListItemIcon>
                      <BoltIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className={classes.menuItemStyle}>Brand List</span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}  >
                    <ListItemIcon>
                      <WbSunnyIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<span className={classes.menuItemStyle}>Category List</span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}  >
                    <ListItemIcon>
                      <BoltIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<span className={classes.menuItemStyle}>SubCategory List</span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallproduct')}  >
                    <ListItemIcon>
                      <SolarPowerIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<span className={classes.menuItemStyle}>Products List</span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}  >
                    <ListItemIcon>
                      <SolarPowerIcon/>
                    </ListItemIcon>
                    <ListItemText 
                    primary={<span className={classes.menuItemStyle}>Products Details </span>}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/banner')} >
                    <ListItemIcon>
                      <ViewCarouselIcon/>
                    </ListItemIcon>
                    <ListItemText 
                    primary={<span className={classes.menuItemStyle}>Banners</span>}
                    />
                  </ListItemButton>
                </ListItem>
                
                
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText 
                    primary={<span className={classes.menuItemStyle}>Sales Report </span> }
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate("/adminlogin")}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className={classes.menuItemStyle}>Logout</span>}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Paper>
        </Grid>



        <Grid item xs={9.8} style={{padding:20}}>
          <Routes>
            <Route element={<Brands />} path="/brands"/>
            <Route element={<DisplayAllBrands />} path="/displayallbrands"/>
            <Route element={<Category />} path="/category" />
            <Route element={<DisplayAllCategory />} path="/displayallcategory"/>
            <Route element={<SubCategory />} path="/subcategory" />
            <Route element={<DisplayAllSubCategory />} path="/displayallsubcategory"/>
            <Route element={<Product />} path="/product" />
            <Route element={<DisplayAllProduct />} path="/displayallproduct"/>
            <Route element={<ProductDetails/>} path="/productdetail" />
            <Route element={<DisplayAllProductDetails/>} path="/displayallproductdetails" />
            <Route element={<Banner/>} path="/banner" />
            <Route element={<DisplayAdminDashboard/>} path='/displayadmindashboard' />
          </Routes>  
          
        </Grid>
      </Grid>
    </Box>
  )
}
