import { Drawer, Avatar } from "@mui/material";
import {List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {serverURL } from "../../services/FetchNodeServices"

export default function DrawerComponent({open,setOpen}) {

  var options=[{text:'Your Order',icon:'orders.png',link:''},
            {text:'track Order',icon:'track.png',link:''},
            {text:'Payment Details',icon:'payments.png',link:''},
            {text:'Return',icon:'return.png',link:''}]

    const handleClose=()=>{
        setOpen(false)
    }

    const showList=()=>{
        return options.map((item)=>{
          return <ListItemButton>
            <ListItemIcon>
              <Avatar src={`${serverURL}/images/${item.icon}`} variant="square" sx={{width:30,height:30}}/>
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        })
    }

  return (
    <div>
      <Drawer open={open} onClose={handleClose}>
        <List>
        <ListItemButton>
               <ListItemIcon>
                <img alt="" src={`${serverURL}/images/Guest.png`} style={{width:30,height:30}}/>
               </ListItemIcon>
            
                <ListItemText primary={<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}><span style={{fontWeight:'bold'}}>Guest User</span><span style={{fontSize:10}}>+919752576100</span></div>} />
            </ListItemButton>
            <Divider/>

          {showList()}

          <Divider/>
           <ListItemButton>
               <ListItemIcon>
                <img alt="" src={`${serverURL}/images/logout.png`} style={{width:30,height:30}}/>
               </ListItemIcon>
            
                <ListItemText primary={"Logout"} />
            </ListItemButton>
        </List>
      </Drawer>
    </div>
  )
}
