import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import PostService from '../../Services/postService';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const loggedInUsername = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await PostService.getRequests(loggedInUsername);
      setRequests(fetchedRequests);
    };

    fetchRequests();
  }, [loggedInUsername]);

  return (
    <div>
      <h1>Requests Page</h1>
      {requests.length > 0 ? (
        <div>
          {requests.map((request) => (
            <Card key={request.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Sender: {request.sender}</Typography>
                <Typography variant="body2">
                  Created At: {request.createdAt}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default Requests;
