import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from '../sidebar/sidebar';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/auth-slice';

export default function NavBar() {

  const [state, setState] = React.useState({
   
    left: false,
   
  });
  const dispatch = useDispatch()
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
          Meal Sharing System
          </Typography>
          <Button onClick={() => dispatch(removeUser())} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

<TemporaryDrawer state={state}  toggleDrawer={toggleDrawer}/>

    </Box>
  

    </>
    
  );
}
