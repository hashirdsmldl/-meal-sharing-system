import { getAuth } from "firebase/auth";
import app from "../firebase/firebase";
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { Collections } from "@mui/icons-material";

const auth = getAuth(app);
const db = getFirestore(app);

const PostService = {
  addPost: async (post) => {
    try {
      const postsCollectionRef = collection(db, 'posts');
      await addDoc(postsCollectionRef, post);
      console.log('Post added successfully');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  },
  sendRequest: async (loggedInUsername, postUsername) => {
    if (loggedInUsername === postUsername) {
      alert("You can't send a request to yourself.");
    } else {
      try {
        // Create a request document in Firestore
        const requestDocRef = collection(db, 'requests');
        const requestData = {
          sender: loggedInUsername,
          receiver: postUsername,
          createdAt: new Date().toString()
        };

        // Set the request document data
        await addDoc(requestDocRef, requestData);

        alert('Request sent!');
      } catch (error) {
        console.error('Error sending request:', error);
        alert('Failed to send request. Please try again.');
      }
    }
  },

  
  
  getRequests: async (loggedInUsername) => {
    try {
      const q = query(
        collection(db, 'requests'),
        where('receiver', '==', loggedInUsername)
      );
      const querySnapshot = await getDocs(q);
  
      const fetchedRequests = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt; // Convert date to string
        return { ...data, createdAt };
      });
  
      return fetchedRequests;
    } catch (error) {
      console.error('Error fetching requests:', error);
      return [];
    }
  },
  

  getPostsByCompanyId: async (companyId) => {
    try {
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(postsCollection, where('companyId', '==', companyId));
      const querySnapshot = await getDocs(postsQuery);

      const posts = querySnapshot.docs.map((doc) => {
        const postData = doc.data();
        return {
          title: postData.title,
          content: postData.content,
          time: postData.time,
          username: postData.username
          // Include other post fields as needed
        };
      });

      return posts;
    } catch (error) {
      console.error('Error fetching posts by company ID:', error);
      return [];
    }
  }
};

export default PostService;
