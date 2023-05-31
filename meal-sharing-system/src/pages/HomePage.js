import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, CardContent, Typography, Box } from '@mui/material';
import IMAGES from '../assets/assets';

const HomePage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 3 }}>
      <Card elevation={3} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Welcome to Meal Sharing</Typography>
          <img src={IMAGES.img1} alt="Meal Sharing" style={{ width: '60%', marginBottom: '1rem', borderRadius: '8px' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" component={Link} to="/login" sx={{ mx: 1, backgroundColor: 'orange', color: 'white', '&:hover': { backgroundColor: '#d32f2f' } }}>
              Login
            </Button>
            <Button variant="contained" component={Link} to="/signup" sx={{ mx: 1, backgroundColor: '#2196f3', color: 'white', '&:hover': { backgroundColor: '#1976d2' } }}>
              Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;
