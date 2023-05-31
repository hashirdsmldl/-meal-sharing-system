import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Grid, Typography, Card, Box } from '@mui/material';
import { AddCircleOutlineOutlined, DeleteOutline, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { companyServices } from '../../Services/companyService';
import DeletePrompt from '../../prompt/DeletePrompt';
import { orange } from '@mui/material/colors';

const ViewCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await companyServices.viewCompanies();
      setCompanies(data);
    };

    fetchData();
  }, []);

  const handleAddCompany = () => {
    navigate('/admin/add-company');
  };

  const handleEditCompany = (companyId) => {
    console.log('Edit company:', companyId);
  };

  const handleDeleteCompany = (companyId) => {
    setOpen(true);
    setCompanyId(companyId);
  };

  return (
    <>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            height: '60vh',
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
          <Typography sx={{ marginTop: '6rem',color:orange[500] }} variant="h5" align="center" gutterBottom>
            Companies List
          </Typography>
          <Table sx={{ marginBottom: '5rem' }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.cId}>
                  <TableCell>{company.cId}</TableCell>
                  <TableCell>{company.cName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditCompany(company.cId)} color="info">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCompany(company.cId)} color="error">
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <IconButton onClick={handleAddCompany} color="primary">
                    <AddCircleOutlineOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Grid>
      {open && (
  <DeletePrompt
    id={companyId}
    open={open}
    setOpen={setOpen}
    handleCompanies={setCompanies}
    title="Delete"
    children="Are you sure to delete"
  />
)}
    </>
  );
};

export default ViewCompanies;
