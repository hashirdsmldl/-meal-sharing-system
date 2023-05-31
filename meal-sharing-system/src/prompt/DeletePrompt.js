import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { companyServices } from "../Services/companyService";

const DeletePrompt = ({id, open, setOpen,  handleCompanies, title, children  }) => {
 const navigate=useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

const handleYes=async()=>
{
   
  await companyServices.deleteCompany(id);
  setOpen(false);
  
  // Fetch the updated company list
  const updatedCompanies = await companyServices.viewCompanies();
  handleCompanies(updatedCompanies);

}

const handleNo=()=>
{
    setOpen(false)
}
 

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="prompt-dialog">
      <DialogTitle id="prompt-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button variant="contained" onClick={handleNo} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePrompt;
