import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import UserSideBar from './UserSidebar';
import { removeUser } from '../../store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function UserNavBar({  }) {

  const username=useSelector((state)=>state.auth.email)
  const [state, setState] = React.useState({
   
    left: false,
   
  });
const dispatch=useDispatch();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  

  return (
    <>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'orange' }}> {/* Set bgcolor to 'orange' */}
        <Toolbar>
          <IconButton
onClick={toggleDrawer('left',true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {username}
          </Typography>
          <Button color="inherit"onClick={() => dispatch(removeUser())}>Logout</Button>
        </Toolbar>
      </AppBar>

<UserSideBar state={state}  toggleDrawer={toggleDrawer}/>

    </Box>
  

    </>
    
  );
}
