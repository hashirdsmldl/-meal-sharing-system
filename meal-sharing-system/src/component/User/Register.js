import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import UserService from '../../Services/userService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


const defaultTheme = createTheme();

export default function Register() {
    const errorMessage = useSelector((state) => state.auth.error);


    const navigate=useNavigate();

    const dispatch=useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username');
  
    UserService.registerUser(username, email, password, dispatch, navigate);

    event.target.reset();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
         <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background:orange[500]
        
      }}
    >
  <Grid container  md={8} >
   
      <Grid container component="main" sx={{ height: '50vh'  }}>
       
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: orange[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

            {errorMessage && (
  <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
    {errorMessage}
  </Typography>
)}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              
              />

<TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                type="text"
                id="username"
               
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already Registered ? Login"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Grid>
     
      </Box>
    </ThemeProvider>
  );
}