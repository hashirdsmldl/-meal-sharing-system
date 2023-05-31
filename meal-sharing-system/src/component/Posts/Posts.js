import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import PostService from '../../Services/postService';
import UserService from '../../Services/userService';
import { companyServices } from '../../Services/companyService';

const Posts = () => {
  const [companies, setCompanies] = useState([]);
  const [userCompanyId, setUserCompany] = useState(null);
  const [posts, setPosts] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const username = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchCompanies = async () => {
      const fetchedCompanies = await companyServices.viewCompanies();
      setCompanies(fetchedCompanies);
    };

    const fetchUserCompany = async () => {
      const company = await UserService.fetchUserCompany(username);
      setUserCompany(company);
    };

    const fetchPosts = async () => {
      if (userCompanyId) {
        const fetchedPosts = await PostService.getPostsByCompanyId(userCompanyId);
        setPosts(fetchedPosts);
      }
    };

    const getCompanyName = async () => {
      const name = await companyServices.getCompanyName(userCompanyId);
      setCompanyName(name);
    };

    fetchCompanies();
    fetchUserCompany();
    fetchPosts();
    getCompanyName();
    setLoggedInUsername(username);
  }, [username, userCompanyId]);

  const handleAdd = async (companyId) => {
    await UserService.addUserToCollection(companyId, username);
  };

  const sendRequest =async (postUsername) => {
    if (loggedInUsername === postUsername) {
      alert("You can't send a request to yourself.");
    } else {
    await PostService.sendRequest(loggedInUsername,postUsername)
      alert('Request sent!');
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt={3}>
      {userCompanyId ? (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Posts of {companyName}</Typography>
            {posts.map((post) => (
              <Card key={post.id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.content}</Typography>
                  <Typography variant="body2">Lunch Time for {post.time}</Typography>
                  <Typography variant="body2">Posted by: {post.username}</Typography>
                  {loggedInUsername !== post.username && (
                    <Button variant="contained" color="primary" onClick={() => sendRequest(post.username)}>
                      Request
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      ) : (
        companies.map((company) => (
          <Grid key={company.id} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{company.cName}</Typography>
              <Typography variant="body2">{company.cId}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleAdd(company.cId)}
              >
                Add Me !!
              </Button>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Posts;
