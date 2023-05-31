import React from "react";
import {  useSelector } from "react-redux";



import { Navigate, Outlet } from "react-router-dom";
import UserNavBar from "../component/UserMenu/UserNavbar";
import { Grid } from "@mui/material";

const UserDashBoard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
 

  return isLoggedIn && role === 'user' ?  (
    <>
      <UserNavBar  />
      <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          className="admin-page-container" // Add a CSS class name for styling
          textAlign="center"
          sx={{ backgroundImage: "url('/images/background.jpg')", color: 'white', backgroundSize: 'cover' }}
        >
          <Grid item>
            <h1>Welcome to the Meal Sharing System</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat consectetur neque, id convallis orci
            eleifend ut. Morbi in justo posuere, bibendum dui sit amet, aliquam nunc. Ut vel nunc eget purus pharetra
            laoreet. Duis in lacinia odio, in pharetra ipsum. Integer tincidunt mi et risus lacinia, sit amet fermentum
            turpis feugiat. Nam dignissim pulvinar arcu, id finibus mi finibus nec.
          </p>
          <p>
            Sed vel arcu in neque consequat ultricies. Sed lobortis aliquam tellus nec varius. Aenean auctor erat sed
            lectus finibus, in pulvinar tellus fermentum. Mauris rutrum posuere enim, id dignissim odio pulvinar in. Nullam
            efficitur semper ultrices. Mauris a feugiat ligula. Suspendisse vel mi tristique, malesuada ipsum eu, maximus
            ex. Mauris in odio sed mi pharetra malesuada vitae id felis.
          </p>
          <p>
            Praesent accumsan dolor ac risus placerat, vel convallis lacus congue. Curabitur hendrerit lobortis metus vitae
            aliquet. Donec vel volutpat ligula. Aliquam erat volutpat. Nulla convallis lacus lectus, at tincidunt dolor
            placerat sit amet. Donec auctor velit at justo consectetur feugiat. Sed vel erat eu sem volutpat aliquet in
            vitae nibh. Vivamus varius felis vel augue ullamcorper hendrerit. Mauris faucibus fermentum nunc ac hendrerit.
          </p>
          </Grid>
        </Grid>

      <Outlet />
    </>
  ):(
    <Navigate to='/login'/>
  )
};

export default UserDashBoard;
