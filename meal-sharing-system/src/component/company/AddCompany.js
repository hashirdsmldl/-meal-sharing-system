import { useState } from 'react';
import { TextField, Button, Card, Typography, Box, Alert, Grid } from '@mui/material';
import { orange } from '@mui/material/colors';
import { companyServices } from '../../Services/companyService';


const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doesCompanyIdExist = await companyServices.checkIfCompanyIdExists(companyId);

    if (doesCompanyIdExist) {
      setAlertMessage('Company ID already exists');
      setAlertSeverity('error');
    } else {
      await companyServices.addCompany(companyName, companyId);
      setAlertMessage('Company added successfully');
      setAlertSeverity('success');
      setCompanyName('');
      setCompanyId('');
    }
  };

  return (
    <Grid item xs={12} md={12}>
      <Card
        sx={{
          height: '50vh',
          width:900,
          justifyContent:'center',
          display: 'flex',
          marginTop:'1rem',
         
          marginLeft: 'auto',
          marginRight:'auto',
          boxShadow: 2,
          alignItems: 'center',
          flexDirection: 'column',
        
        }}
      >
        <Typography sx={
{color:orange[500]}
        } variant="h5" align="center" gutterBottom>
          Add company here
        </Typography>
        {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            label="Company Id"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: orange[500] }}>
            Add Company
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default AddCompany;
