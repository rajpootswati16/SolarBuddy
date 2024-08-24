import {useState} from 'react';
import {Button,Box,Container,Typography,Link,Avatar,CssBaseline,TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sandeepsappal.in">
        PS-Softech Gwalior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {

    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const navigate =useNavigate()
  
    const handleSubmit =async () => {

      var body={emailid:emailId,password:password}
      var result=await postData(body, 'admin/check_admin_password')
    
      if(result.status){
        //{ const userData = result.data
        // const password = userData.password}
        const {password,...userData}= result.data
        localStorage.setItem("ADMIN",JSON.stringify(userData))
        navigate("/admindashboard")
      }
      else{
        Swal.fire({
          title: "Admin Login",
          text: result.message,
          icon: "error"
        });
      }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <Box sx={{ mt: 1 }}>
            <TextField style={{marginTop:12}} fullWidth label="Email Address" onChange={(event)=>setEmailId(event.target.value)} />
            
            <TextField style={{marginTop:20}} fullWidth label="Password" type="password" onChange={(event)=>setPassword(event.target.value)} />
            
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}