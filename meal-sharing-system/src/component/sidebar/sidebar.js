import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Navigate, useNavigate } from 'react-router-dom';
export default function TemporaryDrawer({state,toggleDrawer}) {
 
  const navigate = useNavigate();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon/>
              </ListItemIcon>
              <ListItemText primary={"Add Companies"} onClick={()=>navigate('/admin/add-company')}/>
            </ListItemButton>
          </ListItem>
     
      </List>
     
      <List>
      
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <RemoveRedEyeIcon/>
              </ListItemIcon>
              <ListItemText primary={"View Companies"} onClick={()=>navigate('/admin/companies')}  />
            </ListItemButton>
          </ListItem>
          <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}