import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import PostService from '../../Services/postService';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState(null);

  const companyId = useSelector((state) => state.auth.companyId);
  const username = useSelector((state) => state.auth.email);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const post = {
      title: title,
      content: content,
      time: time,
      companyId: companyId,
      username:username
     
    };

    // Call the service to add the post to the database
    await PostService.addPost(post);

    // Clear the input fields
    setTitle('');
    setContent('');
    setTime('');
    setImage(null);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            height: '60vh',
            width: 900,
            justifyContent: 'center',
            display: 'flex',
            marginTop: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: 2,
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Add Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <TextField
                label="Time"
                fullWidth
                margin="normal"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />

              <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default AddPost;
