import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";

const Success = () => {
  const navigate = useNavigate();
  const registrationStatus = useSelector((state) => state.auth.registrationStatus);

  useEffect(() => {
    if (registrationStatus === "success") {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3000); // Delay of 3000 milliseconds (3 seconds)

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [registrationStatus]);

  if (registrationStatus !== "success") {
    return (
     null
    );
  }

  return (
    <Box>
      <Typography variant="h6">Registration successful!</Typography>
      <Typography variant="body1">Redirecting to login...</Typography>
    </Box>
  );
};

export default Success;
