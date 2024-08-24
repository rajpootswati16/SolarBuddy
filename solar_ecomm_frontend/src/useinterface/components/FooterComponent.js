import React from 'react'
import { serverURL } from '../../services/FetchNodeServices'
import { Grid,Divider } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function FooterComponent() {
    
  return (
    <div style={{fontFamily:'Poppins', width:'85%', display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
            <img alt='Solar Buddy' src={`${serverURL}/images/SolarBuddy.png`} style={{width:'26%', height:'30%', marginLeft:'5vw', marginTop:'5%'}}/>
            
            <div style={{fontSize:'1vw', display:'flex', textAlign:'center', fontFamily:'Poppins',fontWeight:'bold', marginLeft:'2vw', marginTop:'5%',color: '#576574',}}>
                <LocationOnIcon style={{fontSize: '1.6vw', color:'black',paddingRight:'1vw'}}/> Thatipur Gwalior, (M.P.)
            </div>
            <div style={{display:'flex',fontSize:'1vw', textAlign:'center', fontFamily:'Poppins',fontWeight:'bold', marginLeft:'2vw', marginTop:'5%',color: '#576574'}}>
                <PhoneIcon style={{fontSize: '1.6vw', color:'black',paddingRight:'1vw'}}/> ( +91 ) 931-061-8373 <br/> (9:00 AM - 7:00 PM)
            </div>
            <div style={{display:'flex',fontSize:'1vw', textAlign:'center', fontFamily:'Poppins',fontWeight:'bold', marginLeft:'2vw', marginTop:'5%',color: '#576574',}}>
                <EmailIcon style={{fontSize: '1.6vw', color:'black', paddingRight:'1vw'}}/> swatirajpoot16@gmail.com 
            </div>
            
        </Grid>
        <Grid item xs={3}>
            <div style={{ fontWeight:'bolder', marginTop:'8%',fontSize:'1vw',marginLeft:'2%' }}>
                INFORMATION
            </div>
            <Divider style={{width:'50%'}}/>
        
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
             <FiberManualRecordIcon style={{fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw',color:'black'}}/>About us
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Contact us
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Shipping Policy
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Payments Policy
            </div>
            <div style={{ fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Privacy Policy
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Cancellation & Return Policy
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Terms & Conditions
            </div>
        </Grid>  

        <Grid item xs={3}>
            <div style={{ fontWeight:'bolder', marginTop:'8%',fontSize:'1vw',marginLeft:'2%' }}>
                MY ACCOUNT
            </div>
            <Divider style={{width:'50%'}}/>
        
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
             <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>My Account
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Wishlist
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Order History
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Become a Vendor
            </div>
            <div style={{ fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Become a Affliate
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Become a Seller
            </div>
        </Grid> 

        <Grid item xs={3}>
            <div style={{ fontWeight:'bolder', marginTop:'8%',fontSize:'1vw',marginLeft:'2%' }}>
                EXTRA
            </div>
            <Divider style={{width:'50%'}}/>
        
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
             <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Site Map
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Shop by Brand
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Shop by City
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey'}}>
             <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Shop by Pincode
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>SolarBuddy Projects
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%', color:'grey' }}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Pay Online
            </div>
            <div style={{fontSize:'0.9vw',marginLeft:'2%',color:'grey'}}>
            <FiberManualRecordIcon style={{color:'black',fontSize:'0.5vw',marginRight:'0.5vw',marginTop:'1vw'}}/>Invester Relations
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',marginRight:'50%',marginTop:'4%'}}>
            <img alt='' src={`${serverURL}/images/SolarBuddy.png`} style={{width:'30%'}}/>
            </div>
        </Grid>  

        <Grid item xs={12}>
            <Divider />
        </Grid>

        <div style={{display:'flex', justifyContent:'center',alignItems:'center',marginTop:'0.8vw'}}>
            <Grid item xs={5} >
            <div style={{ display: 'flex',justifyContent:'flex-start',marginLeft:'5%'}}>
                <img alt='' src={`${serverURL}/images/playstore.png`} style={{width:'65%', height:'55%'}}/>
            </div>    
            </Grid>
            <Grid item xs={7}>
            <div style={{ display: 'flex',justifyContent:'flex-end',marginRight:'2%'}}>
            <img alt='' src={`${serverURL}/images/payment.png`} style={{width:'55%', height:'55%'}}/>
            </div>
            </Grid>
        </div>
        <Grid item xs={12} style={{marginBottom:'1vw'}}>
            <Divider />
        </Grid>
        
      </Grid>
    </div>
  )
}
