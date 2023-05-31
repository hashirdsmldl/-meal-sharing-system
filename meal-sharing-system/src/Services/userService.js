import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addCompanyId, registerUser, setError, setUser } from "../store/auth-slice";
import app from "../firebase/firebase";
import { addDoc, collection, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";


import { useDispatch } from "react-redux";
const auth = getAuth(app);
const db = getFirestore(app);

const UserService = {
  loginUser: (email, password,dispatch,navigate) => {
  
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        let role = user.email === 'hashirawan76@gmail.com' ? 'admin' : 'user';

        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            token: user.accessToken,
            role: role
          })
        );

if (role === 'admin') {
          navigate("/admin");
        }
         else {
          navigate("/user/posts");
        }
      })
      .catch(function (error) {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      });
  },

  registerUser: (username, email, password, dispatch, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userData = {
          username: username,
          email: user.email,
        };
  
        const usersCollectionRef = collection(db, "users");
        addDoc(usersCollectionRef, userData)
          .then(() => {
            dispatch(registerUser(200)); // Dispatch success status
            navigate("/Success");
          })
          .catch((error) => {
            const errorMessage = error.message;
            dispatch(setError(errorMessage));
            dispatch(registerUser(500));
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
        dispatch(registerUser(500));
      });
  }
  ,checkIfUserExists: async (username) => {
    try {
      const usersCollectionRef = collection(db, 'companyusers');
      const userQuery = query(usersCollectionRef, where('username', '==', username));
      const querySnapshot = await getDocs(userQuery);
  
      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const existingCompanyId = userData.companyId;
  
        // Check if the user already has a companyId assigned
        if (existingCompanyId) {
          throw new Error('User is already associated with a company.');
        }
  
        return userDoc;
      }
  
      return null;
    } catch (error) {
      console.error('Error checking if user exists: ', error);
      throw error;
    }
  },
  
  addUserToCollection: async (companyId, username, dispatch) => {
    try {

        const usersCollectionRef = collection(db, 'companyusers');
      const userDoc = await UserService.checkIfUserExists(username);
  
      if (userDoc) {
        // Update the user document with the companyId
        await setDoc(userDoc.ref, { companyId: companyId }, { merge: true });
        dispatch(addCompanyId(companyId));
      } else {
        // Create a new user document if the user does not exist
        const newUser = {
          username: username,
          companyId: companyId,
        };
  
        const newUserDocRef = await addDoc(usersCollectionRef, newUser);
        // userDoc = await getDoc(newUserDocRef);
        dispatch(addCompanyId(companyId));
      }
  
      console.log('User added to company successfully');
    } catch (error) {
      console.error('Error adding user to company: ', error);
    }
  },
  
  fetchUserCompany: async (username) => {
    try {
      const userCompanyQuery = query(collection(db, 'companyusers'), where('username', '==', username));
      const querySnapshot = await getDocs(userCompanyQuery);
  
      if (querySnapshot.size > 0) {
        const userCompanyData = querySnapshot.docs[0].data();
        return userCompanyData.companyId;
      }
  
      return null;
    } catch (error) {
      console.error('Error fetching user company: ', error);
      return null;
    }
  },

};

export default UserService;
